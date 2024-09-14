import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ProtocolService } from "../services/protocol.service";
import { Protocols } from "../entities/protocols.entity";
import { ProtocolCreateDto, ProtocolUpdateDto } from "../dto/protocol.dto";
import { IStaff } from "auth/types/types";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { IssueJournalDto } from "modules/journal/dto/issue.journal.dto";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";

@Controller('protocol')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class ProtocolController {
    constructor(private protocolService: ProtocolService) { }

    @Get()
    @CheckPermissions('canViewRecords')
    async getProtocols(@Query('year') year?: number): Promise<Protocols[]> {
        return await this.protocolService.getProtocols(year);
    }

    @Post()
    @CheckPermissions('canAddRecords')
    async createProtocol(@Req() req: { user: IStaff }, @Body() body: ProtocolCreateDto): Promise<{ message: string }> {
        return await this.protocolService.createProtocol(req.user.id, body);
    }

    @Patch(':id')
    @CheckPermissions('canEditRecords')
    async updateProtocol(@Param('id', ValidateIdPipe) id: number, @Body() body: ProtocolUpdateDto): Promise<{ message: string }> {
        return await this.protocolService.updateProtocol(id, body);
    }

    @Post(':id/issue')
    @CheckPermissions('canAddRecords')
    async issueProtocol(@Param('id', ValidateIdPipe) id: number, @Body() body: IssueJournalDto): Promise<{ message: string }> {
        return await this.protocolService.issueProtocol(id, body);
    }
}