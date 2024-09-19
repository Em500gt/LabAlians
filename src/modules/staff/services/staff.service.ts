import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CombinedDto, CombinedUpdateDto } from "../dto/combined.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Staff } from '../entities/staff.entity';
import { EntityManager, Repository } from "typeorm";
import { Accounts } from "../entities/accounts.entity";
import { Divisions } from "../entities/divisions.entity";
import { Positions } from "../entities/positions.entity";
import { StaffGroups } from "../entities/staff.groups.entity";
import { ConfigService } from '@nestjs/config';
const bcrypt = require('bcryptjs');

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,

        @InjectRepository(Positions)
        private readonly positionsRepository: Repository<Positions>,

        @InjectRepository(Divisions)
        private readonly divisionsRepository: Repository<Divisions>,

        @InjectRepository(StaffGroups)
        private readonly staffGroupsRepository: Repository<StaffGroups>,

        @InjectRepository(Accounts)
        private readonly accountRepository: Repository<Accounts>,

        private configService: ConfigService

    ) { }

    async findStaff(): Promise<Staff[]> {
        return this.staffRepository
            .createQueryBuilder('staff')
            .leftJoinAndSelect('staff.positionID', 'position')
            .leftJoinAndSelect('staff.divisionID', 'division')
            .select([
                'staff.id as id',
                'staff.firstname as firstname',
                'staff.lastname as lastname',
                'staff.tabelNum as tabelNum',
                'position.position as position',
                'division.division as division'
            ])
            .getRawMany();
    }

    async createStaff(body: CombinedDto): Promise<{ message: string }> {
        const { staffCreateData, accountCreateDto } = body;
        await this.validateUniqueLogin(accountCreateDto.login);
        await this.validateUniqueTabelNum(staffCreateData.tabelNum);
        await this.validatePositionExists(staffCreateData.positionID);
        await this.validateDivisionExists(staffCreateData.divisionID);
        await this.validateStaffGroupExists(accountCreateDto.staffGroupID);

        const saltRounds = this.getSaltRounds();
        const hashedPassword = await bcrypt.hash(accountCreateDto.password, saltRounds);

        return await this.staffRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
            try {
                const staff = await transactionalEntityManager.save(Staff, {
                    firstname: staffCreateData.firstname,
                    lastname: staffCreateData.lastname,
                    tabelNum: staffCreateData.tabelNum,
                    positionID: { id: staffCreateData.positionID } as Positions,
                    divisionID: { id: staffCreateData.divisionID } as Divisions,
                });

                await transactionalEntityManager.save(Accounts, {
                    login: accountCreateDto.login,
                    password: hashedPassword,
                    staffGroup: { id: accountCreateDto.staffGroupID } as StaffGroups,
                    staff: staff
                });

                return { message: 'Staff created successfully' };
            }
            catch (error) {
                console.log(error.message);
                throw new InternalServerErrorException('An error occurred while processing the transaction.');
            }
        })
    }

    async updateStaff(id: number, body: CombinedUpdateDto): Promise<{ message: string }> {
        return await this.staffRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
            try {
                const existingStaff = await transactionalEntityManager.findOne(Staff, { where: { id } });
                if (!existingStaff) {
                    throw new NotFoundException(`Staff with ID ${id} not found`);
                }
                const {staffUpdateDto, acountUpdateDto} = body;

                if (staffUpdateDto.firstname) {
                    existingStaff.firstname = staffUpdateDto.firstname;
                }
                if (staffUpdateDto.lastname) {
                    existingStaff.lastname = staffUpdateDto.lastname;
                }
                if (staffUpdateDto.tabelNum) {
                    await this.validateUniqueTabelNum(staffUpdateDto.tabelNum);
                    existingStaff.tabelNum = staffUpdateDto.tabelNum;
                }
                if (staffUpdateDto.positionID) {
                    await this.validatePositionExists(staffUpdateDto.positionID);
                    existingStaff.positionID = { id: staffUpdateDto.positionID } as Positions;
                }
                if (staffUpdateDto.divisionID) {
                    await this.validateDivisionExists(staffUpdateDto.divisionID);
                    existingStaff.divisionID = { id: staffUpdateDto.divisionID } as Divisions;
                }

                const updatedStaff = await transactionalEntityManager.save(Staff, existingStaff);

                const existingAccount = await transactionalEntityManager.findOne(Accounts, {
                    where: { staff: { id: updatedStaff.id } },
                });

                if (existingAccount) {
                    let accountUpdated = false;

                    if (acountUpdateDto.staffGroupID) {
                        await this.validateStaffGroupExists(acountUpdateDto.staffGroupID);
                        existingAccount.staffGroup = { id: acountUpdateDto.staffGroupID } as StaffGroups;
                        accountUpdated = true;
                    }

                    if (accountUpdated) {
                        await transactionalEntityManager.save(Accounts, existingAccount);
                    }
                }

                return { message: 'Staff updated successfully' };
            } catch (error) {
                if (error instanceof BadRequestException || error instanceof NotFoundException) {
                    throw error
                }
                throw new InternalServerErrorException('An error occurred while processing the transaction.');
            }
        });
    }

    async deleteStaff(id: number): Promise<{ message: string }> {
        try {
            const result = await this.staffRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Staff with ID ${id} not found`);
            }
            return { message: `Staff with ID ${id} succesfully deleted` };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error
            }
            if (error.code === '23503') {
                throw new BadRequestException(`Cannot delete staff with ID ${id}, as it is still referenced by other entities`);
            }
            throw new InternalServerErrorException(`Error deleting staff: ${error.message}`);
        }
    }

    private async validateUniqueLogin(login: string): Promise<void> {
        const existingAccount = await this.accountRepository.findOne({ where: { login } });
        if (existingAccount) {
            throw new BadRequestException('Login already exists');
        }
    }

    private async validateUniqueTabelNum(tabelNum: number): Promise<void> {
        const existingStaff = await this.staffRepository.findOne({ where: { tabelNum } });
        if (existingStaff) {
            throw new BadRequestException('Tabel number already exists');
        }
    }

    private async validatePositionExists(id: number): Promise<void> {
        const position = await this.positionsRepository.findOne({ where: { id } });
        if (!position) {
            throw new NotFoundException('Position not found');
        }
    }

    private async validateDivisionExists(id: number): Promise<void> {
        const division = await this.divisionsRepository.findOne({ where: { id } });
        if (!division) {
            throw new NotFoundException('Division not found');
        }
    }

    private async validateStaffGroupExists(id: number): Promise<void> {
        const staffGroup = await this.staffGroupsRepository.findOne({ where: { id } });
        if (!staffGroup) {
            throw new NotFoundException('Staff group not found');
        }
    }

    private getSaltRounds(): number {
        const saltRoundsStr = this.configService.get<string>('PASSWORD_SALT');
        if (!saltRoundsStr) {
            throw new InternalServerErrorException('PASSWORD_SALT is not defined in the environment variables');
        }
        const saltRounds = parseInt(saltRoundsStr, 10);
        if (isNaN(saltRounds)) {
            throw new InternalServerErrorException('PASSWORD_SALT is not a valid number');
        }
        return saltRounds;
    }

    async findOne(login: string): Promise<any> {
        return await this.accountRepository.findOne({ where: { login } })
    }

    async findStaffGroup(login: any): Promise<any> {
        return await this.accountRepository.findOne({
            where: { login },
            relations: ['staffGroup'],
            select: {
                staffGroup: {
                    canViewRecords: true,
                    canAddRecords: true,
                    canEditRecords: true,
                    canDeleteRecords: true,
                    canAccessFiles: true,
                    fullAccess: true
                }
            }
        })
    }

    async updatePassword(id: number, newPassword: string): Promise<{ message: string }> {
        try {
            const saltRounds = this.getSaltRounds();
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
            const result = await this.accountRepository.update({ id }, { password: hashedPassword });
            if (result.affected === 0) {
                throw new NotFoundException('Staff account not found');
            }
            return { message: 'Password updated successfully' }
        } catch (error) {
            throw new InternalServerErrorException('An error occurred while updating the password');
        }
    }
}