import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProtocolFiles } from "../entities/protocol.files.entity";
import { Repository } from "typeorm";
import { Protocols } from "../entities/protocols.entity";

@Injectable()
export class ProtocolFilesService {
    constructor(
        @InjectRepository(ProtocolFiles)
        private readonly protocolFilesRepository: Repository<ProtocolFiles>,

        @InjectRepository(Protocols)
        private readonly protocolsRepository: Repository<Protocols>
    ) { }

    async findProtocolFiles(id: number): Promise<ProtocolFiles> {
        const file = await this.protocolFilesRepository.findOne({ where: { id } })
        if (!file) {
            throw new NotFoundException(`File with ID ${id} not fount`)
        }
        return file;
    }

    async createProtocolFiles(protocolID: number, filename: string, pdfData: Buffer): Promise<ProtocolFiles> {
        // const protocol = await this.protocolsRepository.findOne({ where: { id: protocolID } }) ///// ОТКЛЮЧИЛ ВНЕШНИЙ КЛЮЧ

        // if (!protocol) {
        //     throw new NotFoundException(`Protocol with ID ${protocolID} not found`);
        // } 
        
        const newFile = this.protocolFilesRepository.create({
            filename,
            pdfData,
            // protocolID: { id: protocolID } as Protocols,
        })

        return await this.protocolFilesRepository.save(newFile);
    }
}