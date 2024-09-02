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
import * as bcrypt from 'bcrypt';

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
        await this.validateUniqueLogin(body.login);
        await this.validateUniqueTabelNum(body.tabelNum);
        await this.validatePositionExists(body.positionID);
        await this.validateDivisionExists(body.divisionID);
        await this.validateStaffGroupExists(body.staffGroupID);

        const saltRounds = this.getSaltRounds();
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        return await this.staffRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
            try {
                const staff = await transactionalEntityManager.save(Staff, {
                    firstname: body.firstname,
                    lastname: body.lastname,
                    tabelNum: body.tabelNum,
                    positionID: { id: body.positionID } as Positions,
                    divisionID: { id: body.divisionID } as Divisions,
                });

                await transactionalEntityManager.save(Accounts, {
                    login: body.login,
                    password: hashedPassword,
                    staffGroup: { id: body.staffGroupID } as StaffGroups,
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

                if (body.firstname) {
                    existingStaff.firstname = body.firstname;
                }
                if (body.lastname) {
                    existingStaff.lastname = body.lastname;
                }
                if (body.tabelNum) {
                    await this.validateUniqueTabelNum(body.tabelNum);
                    existingStaff.tabelNum = body.tabelNum;
                }
                if (body.positionID) {
                    await this.validatePositionExists(body.positionID);
                    existingStaff.positionID = { id: body.positionID } as Positions;
                }
                if (body.divisionID) {
                    await this.validateDivisionExists(body.divisionID);
                    existingStaff.divisionID = { id: body.divisionID } as Divisions;
                }

                const updatedStaff = await transactionalEntityManager.save(Staff, existingStaff);

                const existingAccount = await transactionalEntityManager.findOne(Accounts, {
                    where: { staff: { id: updatedStaff.id } },
                });

                if (existingAccount) {
                    let accountUpdated = false;

                    if (body.staffGroupID) {
                        await this.validateStaffGroupExists(body.staffGroupID);
                        existingAccount.staffGroup = { id: body.staffGroupID } as StaffGroups;
                        accountUpdated = true;
                    }

                    if (accountUpdated) {
                        await transactionalEntityManager.save(Accounts, existingAccount);
                    }
                }

                return { message: 'Staff updated successfully' };
            } catch (error) {
                if(error instanceof BadRequestException || error instanceof NotFoundException) {
                    throw error
                }
                throw new InternalServerErrorException('An error occurred while processing the transaction.');
            }
        });
    }

    async deleteStaff(id: number): Promise<{ message: string }> {
        const result = await this.staffRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Staff with ID ${id} not found`);
        }
        return { message: `Staff with ID ${id} succesfully deleted` };
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

    private async validatePositionExists(positionID: number): Promise<void> {
        const position = await this.positionsRepository.findOne({ where: { id: positionID } });
        if (!position) {
            throw new NotFoundException('Position not found');
        }
    }

    private async validateDivisionExists(divisionID: number): Promise<void> {
        const division = await this.divisionsRepository.findOne({ where: { id: divisionID } });
        if (!division) {
            throw new NotFoundException('Division not found');
        }
    }

    private async validateStaffGroupExists(staffGroupID: number): Promise<void> {
        const staffGroup = await this.staffGroupsRepository.findOne({ where: { id: staffGroupID } });
        if (!staffGroup) {
            throw new NotFoundException('Staff group not found');
        }
    }

    private getSaltRounds(): number {
        const saltRoundsStr = this.configService.get<string>('PASSWORD_SALT');
        if (!saltRoundsStr) {
            throw new BadRequestException('PASSWORD_SALT is not defined in the environment variables');
        }
        const saltRounds = parseInt(saltRoundsStr, 10);
        if (isNaN(saltRounds)) {
            throw new BadRequestException('PASSWORD_SALT is not a valid number');
        }
        return saltRounds;
    }
}