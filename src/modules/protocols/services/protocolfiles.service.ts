import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, StreamableFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProtocolFiles } from "../entities/protocol.files.entity";
import { Repository } from "typeorm";
import { Protocols } from "../entities/protocols.entity";
import { promisify } from 'util';
import { gzip as gzipCb, gunzip as gunzipCb } from 'zlib';
@Injectable()
export class ProtocolFilesService {
    constructor(
        @InjectRepository(ProtocolFiles)
        private readonly protocolFilesRepository: Repository<ProtocolFiles>,

        @InjectRepository(Protocols)
        private readonly protocolsRepository: Repository<Protocols>
    ) { }

    async findProtocolFiles(protocolID: number): Promise<StreamableFile> {
        const file = await this.protocolFilesRepository.findOne({ where: { protocolID: { id: protocolID } } })
        if (!file) {
            throw new NotFoundException(`File with protocol ID ${protocolID} not found`);
        }
        const gunzipAsync = promisify(gunzipCb);
        return new StreamableFile(await gunzipAsync(file.pdfData), {
            type: 'application/pdf',
            disposition: `attachment; filename="${file.filename}"`,
        })
    }

    async createProtocolFiles(protocolID: number, file: Express.Multer.File, staffID: number): Promise<{ message: string }> {
        const protocol = await this.checkProtocol(protocolID);
        await this.checkProtocolFile(protocolID);
        await this.checkForbiddenException(protocol.staffID.id, staffID)
        const gzipAsync = promisify(gzipCb);
        if (!file) {
            throw new HttpException('File upload failed!', HttpStatus.BAD_REQUEST);
        }
        const pdfData = await gzipAsync(file.buffer)
        const filename = `protocol_${protocolID}.pdf`;
        try {
            const protocolFile = await this.protocolFilesRepository.save({
                filename,
                pdfData,
                protocolID: { id: protocol.id },
            });
            return { message: `Protocol file ${protocolFile.filename} uploaded successfully` };
        } catch (error) {
            throw new InternalServerErrorException('Error creating protocol file');
        }
    }

    async deleteProtocolFile(protocolID: number, staffID: number): Promise<{ message: string }> {
        const protocol = await this.checkProtocol(protocolID);
        if (protocol.isLssied) {
            throw new BadRequestException(`The protocol file cannot be deleted because it has already been issued`);
        }
        await this.checkForbiddenException(protocol.staffID.id, staffID)
        const result = await this.protocolFilesRepository.delete({ protocolID: { id: protocol.id } })
        if (result.affected === 0) {
            throw new NotFoundException(`File with protocol ID ${protocolID} not found`);
        }
        return { message: `File with protocol ID ${protocolID} successfully deleted` };
    }

    private async checkProtocol(id: number): Promise<any> {
        const protocol = await this.protocolsRepository.findOne({ where: { id: id }, relations: ['staffID'] })
        if (!protocol) {
            throw new NotFoundException(`Protocol with ID ${id} not found`);
        }
        return protocol;
    }

    private async checkProtocolFile(id: number): Promise<any> {
        const protocolFile = await this.protocolFilesRepository.findOne({ where: { protocolID: { id } } })
        if (protocolFile) {
            throw new NotFoundException(`File with protocol ID ${id} already exists`);
        }
    }

    private async checkForbiddenException(protocolStaffID: number, staffID: number): Promise<void> {
        if (protocolStaffID !== staffID) {
            throw new ForbiddenException('You do not have the required permissions');
        }
    }
}
