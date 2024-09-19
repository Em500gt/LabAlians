import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StaffGroups } from "../entities/staff.groups.entity";
import { Repository } from "typeorm";
import { StaffGroupsDto, UpdateStaffGroupsDto } from "../dto/staff.groups.dto";
import { Accounts } from "../entities/accounts.entity";

@Injectable()
export class StaffGroupsService {
    constructor(
        @InjectRepository(StaffGroups)
        private staffGroupsRepository: Repository<StaffGroups>,

        @InjectRepository(Accounts)
        private readonly accountRepository: Repository<Accounts>
    ) { }

    async getStaffGroups(): Promise<StaffGroups[]> {
        return await this.staffGroupsRepository.find();
    }

    async createStaffGroups(body: StaffGroupsDto): Promise<{ message: string }> {
        await this.staffGroupFind(body.staffGroup);
        try {
            const staffGroup = await this.staffGroupsRepository.save(body);
            return { message: `Staff group "${staffGroup.staffGroup}" created successfully` };
        } catch (error) {
            throw new InternalServerErrorException('Error creating position');
        }
    }

    async updateStaffGroups(id: number, body: UpdateStaffGroupsDto, login: string): Promise<{ message: string }> {
        const staffGroup = await this.staffGroupsRepository.findOne({ where: { id } });
        if (!staffGroup) {
            throw new NotFoundException(`Staff group with ID ${id} not found`);
        }
        await this.checkAdmin(login, id);
        await this.staffGroupsRepository.update(id, body);
        return { message: `Staff group with ID ${id} successfully updated` };
    }

    async deleteStaffGroups(id: number, login: string): Promise<{ message: string }> {
        try {
            await this.checkAdmin(login, id);
            const result = await this.staffGroupsRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Staff group with ID ${id} not found`);
            }
            return { message: `Staff group with ID ${id} successfully deleted` };
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error
            }
            if (error.code === '23503') {
                throw new BadRequestException(`Cannot delete staff group with ID ${id}, as it is still referenced by other entities`);
            }
            throw new InternalServerErrorException(`Error deleting staff group: ${error.message}`);
        }
    }

    private async staffGroupFind(staffGroup: string): Promise<void> {
        const group = await this.staffGroupsRepository.findOne({ where: { staffGroup } });
        if (group) {
            throw new BadRequestException(`Staff group already exists`);
        }
    }

    private async checkAdmin(login: string, staffGroupID: number): Promise<void> {
        const result = await this.accountRepository.createQueryBuilder('Accounts')
            .leftJoinAndSelect('Accounts.staffGroup', 'staffGroup')
            .where('Accounts.login = :login', { login })
            .select([
                'Accounts.id',
                'Accounts.login',
                'staffGroup.id'
            ])
            .getOne();
        if (result?.staffGroup.id === staffGroupID) {
            throw new BadRequestException('Cannot update or delete admin group');
        }
    }
}
