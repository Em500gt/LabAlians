import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReasonType } from "../entities/reason.type.entity";
import { Repository } from "typeorm";
import { ReasonTypeDto } from "../dto/reason.type.dto";

@Injectable()
export class ReasonTypeService {
    constructor(
        @InjectRepository(ReasonType)
        private readonly reasonTypeRepository: Repository<ReasonType>
    ) { }

    async getReasonType(): Promise<ReasonType[]> {
        try {
            return this.reasonTypeRepository.find();
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve reason types from database');
        }
    }

    async createReasonType(body: ReasonTypeDto): Promise<{ message: string }> {
        const reasonTypeFind = await this.reasonTypeRepository.findOne({ where: { type: body.type } });
        if (reasonTypeFind) {
            throw new BadRequestException('Reason type already exists');
        }
        try {
            const reasonType = await this.reasonTypeRepository.save(body);
            return { message: `Work type ${reasonType.type} created successfully` };
        } catch (error) {
            throw new BadRequestException('Error creating reason type');
        }
    }

    async deleteReasonType(id: number): Promise<{ message: string }> {
        try {
            const result = await this.reasonTypeRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Reason type with ID ${id} not found`);
            }
            return { message: `Reason type with ID ${id} successfully deleted` };
        } catch (error) {
            if (error.code === '23503') {
                throw new BadRequestException(`Cannot delete reason type with ID ${id}, as it is still referenced by other entities`);
            }
            throw new InternalServerErrorException(`Error deleting reason type: ${error.message}`);
        }
    }
}