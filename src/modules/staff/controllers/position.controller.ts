import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { PositionService } from "../services/position.service";
import { Positions } from "../entities/positions.entity";
import { PositionDto } from "../dto/position.dto";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Position')
@ApiBearerAuth()
@Controller('position')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class PositionController {
    constructor(private positionService: PositionService) { }

    @Get()
    @ApiOperation({ summary: 'Get a list of positions' })
    @ApiResponse({ status: 200, type: PositionDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Failed to retrieve protocols from database' })
    async getPosition(): Promise<Positions[]> {
        return await this.positionService.getPosition();
    }

    @Post()
    @ApiBody({ type: PositionDto })
    @ApiOperation({ summary: 'Create a new position' })
    @ApiResponse({ status: 201, description: 'Position created successfully' })
    @ApiResponse({ status: 400, description: 'Position already exists' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Error creating position' })
    async createPosition(@Body() body: PositionDto): Promise<{ message: string }> {
        return await this.positionService.createPosition(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete position' })
    @ApiResponse({ status: 200, description: 'Position with ID successfully deleted' })
    @ApiResponse({ status: 400, description: 'Cannot delete position with ID, as it is still referenced by other entities' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'Position with ID not found' })
    @ApiResponse({ status: 500, description: 'Error deleting position' })
    async deletePosition(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.positionService.deletePosition(id);
    }
}