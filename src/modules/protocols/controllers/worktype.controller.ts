import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { WorkType } from "../entities/work.type.entity";
import { WorkTypeService } from "../services/worktype.service";
import { WorkTypeDto } from "../dto/work.type.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Work type')
@ApiBearerAuth()
@Controller('worktype')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class WorkTypeController {
    constructor(private workTypeService: WorkTypeService) { }

    @Get()
    @CheckPermissions('canViewRecords')
    @ApiOperation({ summary: 'Get a list of work type' })
    @ApiResponse({ status: 200, type: WorkTypeDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Failed to retrieve work types from database' })
    async getWorkType(): Promise<WorkType[]> {
        return await this.workTypeService.getWorkType();
    }

    @Post()
    @ApiBody({ type: WorkTypeDto })
    @ApiOperation({ summary: 'Create a new work type' })
    @ApiResponse({ status: 201, description: 'Work type created successfully' })
    @ApiResponse({ status: 400, description: 'Work type already exists' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Error creating work type' })
    async createWorkType(@Body() body: WorkTypeDto): Promise<{ message: string }> {
        return await this.workTypeService.createWorkType(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove the work type' })
    @ApiResponse({ status: 200, description: 'Work type with ID successfully deleted' })
    @ApiResponse({ status: 400, description: 'Cannot delete work type with ID, as it is still referenced by other entities' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'Work type with ID not found' })
    @ApiResponse({ status: 500, description: 'Error deleting work type' })
    async deleteWorkType(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.workTypeService.deleteWorkType(id);
    }
}