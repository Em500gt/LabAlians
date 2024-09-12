import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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

    async findProtocolFiles(protocolID: number): Promise<ProtocolFiles> {
        const file = await this.protocolFilesRepository.findOne({ where: { protocolID: { id: protocolID } } })
        if (!file) {
            throw new NotFoundException(`File with protocol ID ${protocolID} not found`)
        }
        return file;
    }

    async createProtocolFiles(protocolID: number, filename: string, pdfData: Buffer): Promise<{ message: string }> {
        await this.checkProtocol(protocolID);
        await this.checkProtocolFile(protocolID);
        try {
            const protocolFile = await this.protocolFilesRepository.save({
                filename,
                pdfData,
                protocolID: { id: protocolID } as Protocols,
            });
            return { message: `Protocol file ${protocolFile.filename} uploaded successfully` };
        } catch (error) {
            throw new BadRequestException('Error creating protocol file');
        }
    }

    async deleteProtocolFile(protocolID: number): Promise<{ message: string }> {
        await this.checkProtocol(protocolID);
        const result = await this.protocolFilesRepository.delete({ protocolID: { id: protocolID } })
        if (result.affected === 0) {
            throw new NotFoundException(`File with protocol ID ${protocolID} not found`);
        }
        return { message: `File with protocol ID ${protocolID} successfully deleted` };
    }

    private async checkProtocol(id: number): Promise<any> {
        const protocol = await this.protocolsRepository.findOne({ where: { id: id } })
        if (!protocol) {
            throw new NotFoundException(`Protocol with ID ${id} not found`);
        }
    }

    private async checkProtocolFile(id: number): Promise<any> {
        const protocolFile = await this.protocolFilesRepository.findOne({ where: { protocolID: { id } } })
        if (protocolFile) {
            throw new NotFoundException(`File with protocol ID ${id} already exists`);
        }
    }
}
