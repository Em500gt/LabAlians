import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { PositionService } from "../services/position.service";
import { Positions } from "../entities/positions.entity";
import { PositionDto } from "../dto/position.dto";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";

@Controller('position')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
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