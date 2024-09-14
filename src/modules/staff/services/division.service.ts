import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Divisions } from "../entities/divisions.entity";
import { Repository } from "typeorm";
import { DivisionDto } from "../dto/division.dto";

@Injectable()
export class DivisionService {
    constructor(
        @InjectRepository(Divisions)
        private divisionRepository: Repository<Divisions>,
    ) { }

    async getDivision(): Promise<Divisions[]> {
        return await this.divisionRepository.find();
    }

    async createDivision(body: DivisionDto): Promise<{ message: string }> {
        const divisionFind = await this.divisionRepository.findOne({ where: { division: body.division } })
        if (divisionFind) {
            throw new BadRequestException('Division already exists');
        }
        try {
            const division = await this.divisionRepository.save(body);
            return { message: `Division "${division.division}" created successfully` };
        } catch (error) {
            throw new BadRequestException('Error creating division');
        }
    }

    async deleteDivision(id: number): Promise<{ message: string }> {
        try {
            const result = await this.divisionRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Division with ID ${id} not found`);
            }
            return { message: `Division with ID ${id} successfully deleted` };
        } catch (error) {
            if (error.code === '23503') {
                throw new BadRequestException(`Cannot delete division with ID ${id}, as it is still referenced by other entities`);
            }
            throw new InternalServerErrorException(`Error deleting division: ${error.message}`);
        }

    }
}