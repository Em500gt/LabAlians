import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProtocolStatus } from "../entities/protocol.status.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProtocolStatusDto } from "../dto/protocol.status.dto";

@Injectable()
export class ProtocolStatusService {
    constructor(
        @InjectRepository(ProtocolStatus)
        private readonly protocolStatusRepository: Repository<ProtocolStatus>
    ) { }

    async getProtocolStatus(): Promise<ProtocolStatus[]> {
        try {
            return this.protocolStatusRepository.find();
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve protocol status from database');
        }
    }

    async createProtocolStatus(body: ProtocolStatusDto): Promise<{ message: string }> {
        const protocolStatusFind = await this.protocolStatusRepository.findOne({ where: { status: body.status } });
        if (protocolStatusFind) {
            throw new BadRequestException('Protocol status already exists');
        }
        try {
            const protocolStatus = await this.protocolStatusRepository.save(body);
            return { message: `Protocol status ${protocolStatus.status} created successfully` };
        } catch (error) {
            throw new BadRequestException('Error creating protocol status');
        }
    }

    async deleteProtocolStatus(id: number): Promise<{ message: string }> {
        try {
            const result = await this.protocolStatusRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Protocol status with ID ${id} not found`);
            }
            return { message: `Protocol status with ID ${id} successfully deleted` };
        } catch (error) {
            if (error.code === '23503') {
                throw new BadRequestException(`Cannot delete protocol status with ID ${id}, as it is still referenced by other entities`);
            }
            throw new InternalServerErrorException(`Error deleting protocol status: ${error.message}`);
        }
    }
}