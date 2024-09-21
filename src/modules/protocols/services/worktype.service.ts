import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { WorkType } from "../entities/work.type.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WorkTypeDto } from "../dto/work.type.dto";

@Injectable()
export class WorkTypeService {
    constructor(
        @InjectRepository(WorkType)
        private readonly workTypeRepository: Repository<WorkType>
    ) { }

    async getWorkType(): Promise<WorkType[]> {
        try {
            return await this.workTypeRepository.find();
        }
        catch (error) {
            throw new InternalServerErrorException('Failed to retrieve work types from database');
        }
    }

    async createWorkType(body: WorkTypeDto): Promise<{ message: string }> {
        const workTypeFind = await this.workTypeRepository.findOne({ where: { type: body.type } });
        if (workTypeFind) {
            throw new BadRequestException('Work type already exists');
        }
        try {
            const workType = await this.workTypeRepository.save(body);
            return { message: `Work type ${workType.type} created successfully` }
        }
        catch (error) {
            throw new InternalServerErrorException('Error creating work type')
        }
    }

    async deleteWorkType(id: number): Promise<{ message: string }> {
        try {
            const result = await this.workTypeRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Work type with ID ${id} not found`);
            }
            return { message: `Work type with ID ${id} successfully deleted` };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error
            }
            if (error.code === '23503') {
                throw new BadRequestException(`Cannot delete work type with ID ${id}, as it is still referenced by other entities`);
            }
            throw new InternalServerErrorException(`Error deleting work type: ${error.message}`);
        }
    }
}