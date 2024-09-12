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

    async createProtocol(): Promise<{ message: string }> {
        try {
            const protocol = await this.protocolsRepository.save({
                isAccreditation: true,
                creationDate: new Date(),
                workDate: "Test",
                workObject: "Test",
                copies: 1,
                workSheetNum: 1,
                isLssied: 1,
                note: "test",
                // reasonTypeID: 1, /// !!!!!!!!!!!
                // workTypeID: 1, /// !!!!!!!!!!!
                // protocolStatusID: 1, /// !!!!!!!!!!!
                // customerID: 1, /// !!!!!!!!!!!
                // staffID: 1, /// !!!!!!!!!!!
                // protocolfile: 1
            });
            return { message: `Protocol ${protocol.id} created successfully` };
        } catch (error) {
            throw new BadRequestException(`Error creating protocol`);
        }
    }

}