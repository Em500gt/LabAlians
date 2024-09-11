import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ProtocolStatus } from "../entities/protocol.status.entity";
import { ProtocolStatusService } from "../services/protocolstatus.services";
import { ProtocolStatusDto } from "../dto/protocol.status.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";

@Controller('protocolstatus')
export class ProtocolStatusController {
    constructor(private protocolStatusService: ProtocolStatusService) { }

    @Get()
    async getProtocolStatus(): Promise<ProtocolStatus[]> {
        return await this.protocolStatusService.getProtocolStatus();
    }

    @Post()
    async createProtocolStatus(@Body() body: ProtocolStatusDto): Promise<{ message: string }> {
        return await this.protocolStatusService.createProtocolStatus(body);
    }

    @Delete(':id')
    async deleteProtocolStatus(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.protocolStatusService.deleteProtocolStatus(id);
    }
}