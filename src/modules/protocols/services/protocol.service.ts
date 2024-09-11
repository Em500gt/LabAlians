import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Protocols } from "../entities/protocols.entity";
import { Repository } from "typeorm";
import { ProtocolCreateDto } from "../dto/protocol.create.dto";

@Injectable()
export class ProtocolService {
    constructor(
        @InjectRepository(Protocols)
        private readonly protocolsRepository: Repository<Protocols>
    ) { }

    async getProtocols(): Promise<Protocols[]> {
        try {
            return this.protocolsRepository.find();
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve protocols from database');
        }
    }

    async createProtocol(body: ProtocolCreateDto): Promise<{ message: string }> {
        try {
            const protocol = await this.protocolsRepository.save(body);
            return { message: `Protocol ${protocol.id} created successfully` };
        } catch (error) {
            throw new BadRequestException(`Error creating protocol`);
        }
    }

}