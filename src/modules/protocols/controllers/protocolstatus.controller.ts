import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProtocolStatus } from "../entities/protocol.status.entity";
import { ProtocolStatusService } from "../services/protocolstatus.services";
import { ProtocolStatusDto } from "../dto/protocol.status.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";

@Controller('protocolstatus')
@UseGuards(PermissionsGuard)
export class ProtocolStatusController {
    constructor(private protocolStatusService: ProtocolStatusService) { }

    @Get()
    @CheckPermissions('canViewRecords')
    async getProtocolStatus(): Promise<ProtocolStatus[]> {
        return await this.protocolStatusService.getProtocolStatus();
    }

    @Post()
    @CheckPermissions('fullAccess')
    async createProtocolStatus(@Body() body: ProtocolStatusDto): Promise<{ message: string }> {
        return await this.protocolStatusService.createProtocolStatus(body);
    }

    @Delete(':id')
    @CheckPermissions('fullAccess')
    async deleteProtocolStatus(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.protocolStatusService.deleteProtocolStatus(id);
    }
}