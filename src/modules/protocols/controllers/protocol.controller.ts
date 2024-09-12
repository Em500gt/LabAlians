import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProtocolService } from "../services/protocol.service";
import { Protocols } from "../entities/protocols.entity";
import { ProtocolCreateDto } from "../dto/protocol.create.dto";

@Controller('protocol')
export class ProtocolController {
    constructor(private protocolService: ProtocolService) { }

    @Get()
    async getProtocols(): Promise<Protocols[]> {
        return await this.protocolService.getProtocols();
    }

    @Post()
    async createProtocol(): Promise<{ message: string }> {
        return await this.protocolService.createProtocol();
    }
}