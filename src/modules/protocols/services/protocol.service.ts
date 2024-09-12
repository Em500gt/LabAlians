import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Protocols } from "../entities/protocols.entity";
import { Repository } from "typeorm";
import { ProtocolCreateDto, ProtocolUpdateDto } from "../dto/protocol.dto";
import { ReasonType } from "../entities/reason.type.entity";
import { WorkType } from "../entities/work.type.entity";
import { ProtocolStatus } from "../entities/protocol.status.entity";
import { Customers } from "modules/customers/entities/customers.entity";

@Injectable()
export class ProtocolService {
    constructor(
        @InjectRepository(Protocols)
        private readonly protocolsRepository: Repository<Protocols>,

        @InjectRepository(ReasonType)
        private readonly reasonTypeRepository: Repository<ReasonType>,

        @InjectRepository(WorkType)
        private readonly workTypeRepository: Repository<WorkType>,

        @InjectRepository(ProtocolStatus)
        private readonly protocolStatusRepository: Repository<ProtocolStatus>,

        @InjectRepository(Customers)
        private readonly customersRepository: Repository<Customers>
    ) { }

    async getProtocols(): Promise<Protocols[]> {
        try {
            return this.protocolsRepository.find();
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve protocols from database');
        }
    }

    async createProtocol(id: number, body: ProtocolCreateDto): Promise<{ message: string }> {
        const [reasonTypeID, workTypeID, protocolStatusID, customerID] = await Promise.all([
            this.checkReasonType(body.reasonTypeID),
            this.checkWorkType(body.workTypeID),
            this.checkProtocolStatus(body.protocolStatusID),
            this.checkCustomer(body.customerID)
        ]);
        const protocolData = {
            isAccreditation: body.isAccreditation ?? false,
            creationDate: new Date(),
            workDate: new Date(body.workDate),
            workObject: body.workObject,
            copies: body.copies ?? 1,
            workSheetNum: body.workSheetNum,
            note: body.note,
            reasonTypeID: reasonTypeID,
            workTypeID: workTypeID,
            protocolStatusID: protocolStatusID,
            customerID: customerID,
            staffID: { id }
        }
        try {
            const protocol = await this.protocolsRepository.save(protocolData);
            return { message: `Protocol ${protocol.id} created successfully` };
        } catch (error) {
            console.log(error);
            throw new BadRequestException(`Error creating protocol`);
        }
    }

    async updateProtocol(id: number, body: ProtocolUpdateDto) {
        const protocolFind = await this.protocolsRepository.findOneBy({ id })
        if (!protocolFind) {
            throw new NotFoundException(`Protocol with ID ${id} not found`);
        }
        const [reasonTypeID, workTypeID, protocolStatusID, customerID] = await Promise.all([
            this.checkReasonType(body.reasonTypeID),
            this.checkWorkType(body.workTypeID),
            this.checkProtocolStatus(body.protocolStatusID),
            this.checkCustomer(body.customerID)
        ]);
        
        return { message: `Protocol ${id} update successfully` }
    }

    private async checkReasonType(id?: number): Promise<{ id: number } | undefined> {
        if (!id) {
            return;
        }
        const result = await this.reasonTypeRepository.findOneBy({ id })
        if (!result) {
            throw new NotFoundException('Reason type not found');
        }
        return { id: result.id };
    }

    private async checkWorkType(id?: number): Promise<{ id: number } | undefined> {
        if (!id) {
            return;
        }
        const result = await this.workTypeRepository.findOneBy({ id })
        if (!result) {
            throw new NotFoundException('Work type not found');
        }
        return { id: result.id };
    }

    private async checkProtocolStatus(id?: number): Promise<{ id: number } | undefined> {
        if (!id) {
            return { id: 1 };
        }
        const result = await this.protocolStatusRepository.findOneBy({ id })
        if (!result) {
            throw new NotFoundException('Protocol status not found');
        }
        return { id: result.id };
    }

    private async checkCustomer(id?: number): Promise<{ id: number } | undefined> {
        if (!id) {
            return;
        }
        const result = await this.customersRepository.findOneBy({ id })
        if (!result) {
            throw new NotFoundException('Customers not found');
        }
        return { id: result.id };
    }
}