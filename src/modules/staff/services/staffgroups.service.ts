import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StaffGroups } from "../entities/staff.groups.entity";
import { Repository } from "typeorm";
import { StaffGroupsDto } from "../dto/staff.groups.dto";
import { UpdateStaffGroupsDto } from "../dto/staff.groups.update.dto";

@Injectable()
export class StaffGroupsService {
    constructor(
        @InjectRepository(StaffGroups)
        private staffGroupsRepository: Repository<StaffGroups>
    ) {}
    async getStaffGroups(): Promise<StaffGroups[]> {
        return await this.staffGroupsRepository.find();
    }

    async createStaffGroups(body: StaffGroupsDto): Promise<{ message: string }> {
        try {
            const staffGroup = await this.staffGroupsRepository.save(body);
            return { message: `Staff group "${staffGroup.userGroup}" created successfully` };
        } catch (error) {
            throw new BadRequestException('Error creating position');
        }
    }

    async updateStaffGroups(id: number, body: UpdateStaffGroupsDto): Promise<{ message: string }> {
        const staffGroup = await this.staffGroupsRepository.findOne({ where: { id } });
        if (!staffGroup) {
            throw new NotFoundException(`Staff group with ID ${id} not found`);
        }
        await this.staffGroupsRepository.update(id, body);
        return { message: `Staff group with ID ${id} successfully updated` };
    }

    async deleteStaffGroups(id: number): Promise<{ message: string }> {
        const result = await this.staffGroupsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Staff group with ID ${id} not found`);
        }
        return { message: `Staff group with ID ${id} successfully deleted` };
    }
}