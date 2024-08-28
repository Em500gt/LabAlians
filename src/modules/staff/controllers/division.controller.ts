import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Divisions } from "../entities/divisions.entity";
import { DivisionService } from "../services/division.service";
import { DivisionDto } from "../dto/division.dto";
import { ValidateIdPipe } from "src/pipes/validate.id.pipe";

@Controller('division')
export class DivisionController {
    constructor(private divisionService: DivisionService) {}

    @Get()
    async getDivision(): Promise<Divisions[]> {
        return await this.divisionService.getDivision();
    }

    @Post()
    async createDivision(@Body() body: DivisionDto): Promise<{ message: string }> {
        return await this.divisionService.createDivision(body);
    }

    @Delete(':id')
    async deleteDivision(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.divisionService.deleteDivision(id);
    }
}