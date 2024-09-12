import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { ProtocolService } from "../services/protocol.service";
import { Protocols } from "../entities/protocols.entity";
import { ProtocolCreateDto } from "../dto/protocol.dto";
import { IStaff } from "auth/types/types";

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
}