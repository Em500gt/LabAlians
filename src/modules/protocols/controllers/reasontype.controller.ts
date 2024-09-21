import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ReasonTypeService } from "../services/reasontype.service";
import { ReasonType } from "../entities/reason.type.entity";
import { ReasonTypeDto } from "../dto/reason.type.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Reason type')
@ApiBearerAuth()
@Controller('reasontype')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class ReasonTypeController {
    constructor(private reasonTypeService: ReasonTypeService) { }

    @Get()
    @ApiOperation({ summary: 'Get a list of reasons for work' })
    @ApiResponse({ status: 200, type: ReasonTypeDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Failed to retrieve reason types from database' })
    @CheckPermissions('canViewRecords')
    async getReasonType(): Promise<ReasonType[]> {
        return await this.reasonTypeService.getReasonType();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new reason for work' })
    @ApiBody({ type: ReasonTypeDto })
    @ApiResponse({ status: 201, description: 'Work type created successfully' })
    @ApiResponse({ status: 400, description: 'Reason type already exists' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Error creating reason type' })
    async createReasonType(@Body() body: ReasonTypeDto): Promise<{ message: string }> {
        return await this.reasonTypeService.createReasonType(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove the reason for work' })
    @ApiResponse({ status: 200, description: 'Reason type with ID successfully deleted' })
    @ApiResponse({ status: 400, description: 'Cannot delete reason type with ID, as it is still referenced by other entities' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'Reason type with ID not found' })
    @ApiResponse({ status: 500, description: 'Error deleting reason type' })
    async deleteReasonType(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return this.reasonTypeService.deleteReasonType(id);
    }
}