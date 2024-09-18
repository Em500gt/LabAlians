import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProtocolStatus } from "../entities/protocol.status.entity";
import { ProtocolStatusService } from "../services/protocolstatus.services";
import { ProtocolStatusDto } from "../dto/protocol.status.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Protocol status')
@ApiBearerAuth()
@Controller('protocolstatus')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class ProtocolStatusController {
    constructor(private protocolStatusService: ProtocolStatusService) { }

    @Get()
    @ApiOperation({ summary: 'Get a list of all protocol statuses' })
    @ApiResponse({ status: 200, type: ProtocolStatusDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Failed to retrieve protocol status from database' })
    @CheckPermissions('canViewRecords')
    async getProtocolStatus(): Promise<ProtocolStatus[]> {
        return await this.protocolStatusService.getProtocolStatus();
    }

    @Post()
    @ApiOperation({ summary: 'Create protocol status' })
    @ApiBody({ type: ProtocolStatusDto })
    @ApiResponse({ status: 201, description: 'Protocol status created successfully' })
    @ApiResponse({ status: 400, description: 'Protocol status already exists' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Error creating protocol status' })
    async createProtocolStatus(@Body() body: ProtocolStatusDto): Promise<{ message: string }> {
        return await this.protocolStatusService.createProtocolStatus(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete protocol status' })
    @ApiResponse({ status: 200, description: 'Protocol status with ID successfully deleted' })
    @ApiResponse({ status: 400, description: 'Cannot delete protocol status with ID, as it is still referenced by other entities' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'Protocol status with ID not found' })
    @ApiResponse({ status: 500, description: 'Error deleting protocol status' })
    async deleteProtocolStatus(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.protocolStatusService.deleteProtocolStatus(id);
    }
}