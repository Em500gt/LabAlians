import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Positions } from "../entities/positions.entity";
import { PositionDto } from "../dto/position.dto";

@Injectable()
export class PositionService {
    constructor(
        @InjectRepository(Positions)
        private positionRepository: Repository<Positions>,
    ) { }

    async getPosition(): Promise<Positions[]> {
        return await this.positionRepository.find();
    }

    async createPosition(body: PositionDto): Promise<{ message: string }> {
        const positionFind = await this.positionRepository.findOne({ where: { position: body.position } })
        if (positionFind) {
            throw new BadRequestException('Position already exists');
        }
        try {
            const position = await this.positionRepository.save(body);
            return { message: `Position ${position.position} created successfully` };
        } catch (error) {
            throw new BadRequestException('Error creating position');
        }
    }

    async deletePosition(id: number): Promise<{ message: string }> {
        try {
            const result = await this.positionRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Position with ID ${id} not found`);
            }
            return { message: `Position with ID ${id} successfully deleted` };
        } catch (error) {
            if (error.code === '23503') {
                throw new BadRequestException(`Cannot delete position with ID ${id}, as it is still referenced by other entities`);
            }
            throw new InternalServerErrorException(`Error deleting position: ${error.message}`);
        }
    }
}