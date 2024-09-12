import { Body, Controller, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { ProtocolService } from "../services/protocol.service";
import { Protocols } from "../entities/protocols.entity";
import { ProtocolCreateDto, ProtocolUpdateDto } from "../dto/protocol.dto";
import { IStaff } from "auth/types/types";
import { ValidateIdPipe } from "pipes/validate.id.pipe";

@Controller('protocol')
export class ProtocolController {
    constructor(private protocolService: ProtocolService) { }

    @Get()
    async getProtocols(): Promise<Protocols[]> {
        return await this.protocolService.getProtocols();
    }

    @Post()
    async createProtocol(@Req() req: any, @Body() body: ProtocolCreateDto): Promise<{ message: string }> {
        return await this.protocolService.createProtocol(req.user.id, body);
    }

    @Patch(':id')
    async updateProtocol(@Param('id', ValidateIdPipe) id: number, @Body() body: ProtocolUpdateDto): Promise<{ message: string }> {
        return await this.protocolService.updateProtocol(id, body);
    }
}