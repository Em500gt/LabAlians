import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Divisions } from "../entities/divisions.entity";
import { DivisionService } from "../services/division.service";
import { DivisionDto } from "../dto/division.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Division')
@ApiBearerAuth()
@Controller('division')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class DivisionController {
    constructor(private divisionService: DivisionService) { }

    @Get()
    @ApiOperation({ summary: 'Get list of division' })
    @ApiResponse({ status: 200, type: DivisionDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Failed to retrieve protocols from database' })
    async getDivision(): Promise<Divisions[]> {
        return await this.divisionService.getDivision();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new division' })
    @ApiBody({ type: DivisionDto })
    @ApiResponse({ status: 201, description: 'Division created successfully' })
    @ApiResponse({ status: 400, description: 'Division already exists' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Error creating division' })
    async createDivision(@Body() body: DivisionDto): Promise<{ message: string }> {
        return await this.divisionService.createDivision(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete division' })
    @ApiResponse({ status: 200, description: 'Division with ID successfully deleted' })
    @ApiResponse({ status: 400, description: 'Cannot delete division with ID, as it is still referenced by other entities' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'Division with ID not found' })
    @ApiResponse({ status: 500, description: 'Error deleting division' })
    async deleteDivision(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.divisionService.deleteDivision(id);
    }
}