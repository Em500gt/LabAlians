import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CombinedDto, CombinedUpdateDto } from "../dto/combined.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Staff } from '../entities/staff.entity';
import { EntityManager, Repository } from "typeorm";
import { Accounts } from "../entities/accounts.entity";
import { Divisions } from "../entities/divisions.entity";
import { Positions } from "../entities/positions.entity";
import { StaffGroups } from "../entities/staff.groups.entity";

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,
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
                    password: body.password,
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
                const updatedStaff = await transactionalEntityManager.save(Staff, {
                    id: existingStaff.id,
                    firstname: body.firstname,
                    lastname: body.lastname,
                    tabelNum: body.tabelNum,
                    positionID: { id: body.positionID } as Positions,
                    divisionID: { id: body.divisionID } as Divisions,
                });

                const existingAccount = await transactionalEntityManager.findOne(Accounts, {
                    where: { staff: { id: updatedStaff.id } },
                });
                if (existingAccount) {
                    await transactionalEntityManager.save(Accounts, {
                        id: existingAccount.id, // Указываем ID для обновления
                        password: body.password,
                        staffGroup: { id: body.staffGroupID } as StaffGroups,
                        staff: updatedStaff
                    });
                }
                return { message: 'Staff updated successfully' };
            }
            catch (error) {
                console.log(error.message);
                throw new InternalServerErrorException('An error occurred while processing the transaction.');
            }
        })
    }

    async deleteStaff(id: number): Promise<{ message: string }> {
        const result = await this.staffRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Position wi ID ${id} not found`);
        }
        return { message: `Position with ID ${id} succesfully deleted` };
    }
}