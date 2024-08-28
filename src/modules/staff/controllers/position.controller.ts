import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ValidateIdPipe } from "src/pipes/validate.id.pipe";
import { PositionService } from "../services/position.service";
import { Positions } from "../entities/positions.entity";
import { PositionDto } from "../dto/position.dto";

@Controller('position')
export class PositionController {
    constructor(private positionService: PositionService) {}

    @Get()
    async getPosition(): Promise<Positions[]> {
        return await this.positionService.getPosition();
    }

    @Post()
    async createPosition(@Body() body: PositionDto): Promise<{ message: string }> {
        return await this.positionService.createPosition(body);
    }

    @Delete(':id')
    async deletePosition(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.positionService.deletePosition(id);
    }
}