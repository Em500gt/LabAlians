import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Protocols } from "../entities/protocols.entity";
import { EntityManager, Repository } from "typeorm";
import { ProtocolCreateDto, ProtocolUpdateDto } from "../dto/protocol.dto";
import { ReasonType } from "../entities/reason.type.entity";
import { WorkType } from "../entities/work.type.entity";
import { ProtocolStatus } from "../entities/protocol.status.entity";
import { Customers } from "modules/customers/entities/customers.entity";
import { IssueJournal } from "modules/journal/entities/issue.journal.entity";
import { IssueJournalDto } from "modules/journal/dto/issue.journal.dto";
import { IssueMethod } from "modules/journal/entities/issue.method.entity";
import { ProtocolFiles } from "../entities/protocol.files.entity";

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

    async getProtocols(year?: number): Promise<Protocols[]> {
        try {
            const query = this.protocolsRepository.createQueryBuilder('protocols')
                .leftJoinAndSelect('protocols.staffID', 'staff')
                .leftJoinAndSelect('protocols.reasonTypeID', 'reasonType')
                .leftJoinAndSelect('protocols.workTypeID', 'workType')
                .leftJoinAndSelect('protocols.customerID', 'customer')
                .select([
                    'protocols.id',
                    'protocols.workDate',
                    'protocols.workSheetNum',
                    'protocols.workObject',
                    'protocols.isLssied',
                    'staff.firstname',
                    'staff.lastname',
                    'workType.type',
                    'customer.customerName'
                ]);
            if (year) {
                query.where('EXTRACT(YEAR FROM protocols.creationDate) = :year', { year });
            }
            query.orderBy('protocols.creationDate', 'DESC');
            return await query.getMany();
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve protocols from database');
        }
    }
    async getOneProtocol(id: number): Promise<Protocols> {
        try {
            const query = this.protocolsRepository.createQueryBuilder('protocols')
                .leftJoin('protocols.staffID', 'staff')
                .addSelect(['staff.firstname', 'staff.lastname', 'staff.tabelNum'])
                .leftJoin('protocols.reasonTypeID', 'reasonType')
                .addSelect(['reasonType.type'])
                .leftJoin('protocols.workTypeID', 'workType')
                .addSelect(['workType.type'])
                .leftJoin('protocols.protocolStatusID', 'protocolStatus')
                .addSelect(['protocolStatus.status'])
                .leftJoin('protocols.customerID', 'customer')
                .addSelect(['customer.customerName', 'customer.phone'])
                .where('protocols.id = :id', { id });
            const protocol = await query.getOne();
            if (!protocol) {
                throw new NotFoundException(`Protocol with ID ${id} not found`)
            }
            return protocol;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error
            }
            throw new InternalServerErrorException('Failed to retrieve protocol from database');
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
            throw new InternalServerErrorException(`Error creating protocol`);
        }
    }

    async updateProtocol(id: number, body: ProtocolUpdateDto, staffID: number) {
        const protocol = await this.protocolsRepository.findOne({ where: { id }, relations: ['staffID'] })
        if (!protocol) {
            throw new NotFoundException(`Protocol with ID ${id} not found`);
        }
        await this.checkForbiddenException(protocol.staffID.id, staffID);

        const [reasonTypeID, workTypeID, protocolStatusID, customerID] = await Promise.all([
            body.reasonTypeID ? this.checkReasonType(body.reasonTypeID) : protocol.reasonTypeID,
            body.workTypeID ? this.checkWorkType(body.workTypeID) : protocol.workTypeID,
            body.protocolStatusID ? this.checkProtocolStatus(body.protocolStatusID) : protocol.protocolStatusID,
            body.customerID ? this.checkCustomer(body.customerID) : protocol.customerID
        ]);
        const updatedProtocolData = {
            ...protocol,
            isAccreditation: body.isAccreditation ?? protocol.isAccreditation,
            workDate: body.workDate ? new Date(body.workDate) : protocol.workDate,
            workObject: body.workObject ?? protocol.workObject,
            copies: body.copies ?? protocol.copies,
            workSheetNum: body.workSheetNum ?? protocol.workSheetNum,
            note: body.note ?? protocol.note,
            reasonTypeID: reasonTypeID,
            workTypeID: workTypeID,
            protocolStatusID: protocolStatusID,
            customerID: customerID,
        };
        try {
            await this.protocolsRepository.save(updatedProtocolData);
            return { message: `Protocol ${id} updated successfully` };
        } catch (error) {
            throw new InternalServerErrorException(`Error updating protocol`);
        }
    }

    async issueProtocol(id: number, body: IssueJournalDto, staffID: number): Promise<{ message: string }> {
        return await this.protocolsRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
            try {
                const protocol = await transactionalEntityManager.findOne(Protocols, {
                    where: { id },
                    relations: ['reasonTypeID', 'workTypeID', 'protocolStatusID', 'customerID', 'staffID']
                })
                if (!protocol) {
                    throw new NotFoundException(`Protocol with ID ${id} not found`);
                }
                await this.checkForbiddenException(protocol.staffID.id, staffID);
                if (protocol.isLssied) {
                    throw new BadRequestException(`The protocol has already been issued to the customer`)
                }
                const findProtocolFile = await transactionalEntityManager.findOne(ProtocolFiles, { where: { protocolID: { id } } })
                if (!findProtocolFile) {
                    throw new BadRequestException(`Protocol file absent in protocol`)
                }
                const issueMethod = await transactionalEntityManager.findOne(IssueMethod, { where: { id: body.issueMethodID } })
                if (!issueMethod) {
                    throw new NotFoundException('Issue method not found');
                }

                await this.checkIssueProtocol(protocol);
                await transactionalEntityManager.update(Protocols, { id }, { isLssied: true });
                await transactionalEntityManager.save(IssueJournal, {
                    date: new Date(),
                    issueMethodID: { id: issueMethod.id },
                    protocolID: { id: protocol.id }
                })
                return { message: `The protocol was successfully issued to the customer` };
            } catch (error) {
                if (error instanceof BadRequestException || error instanceof NotFoundException || error instanceof ForbiddenException) {
                    throw error
                }
                throw new InternalServerErrorException('An error occurred while processing the transaction.', error.message);
            }
        })
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

    private async checkIssueProtocol(protocol: Protocols): Promise<void> {
        const requiredFields: { field: keyof Protocols, errorMessage: string }[] = [
            { field: 'workDate', errorMessage: 'Work date is missing in the protocol' },
            { field: 'workObject', errorMessage: 'Work object is missing in the protocol' },
            { field: 'copies', errorMessage: 'Copies is missing in the protocol' },
            { field: 'workSheetNum', errorMessage: 'Work sheet is missing in the protocol' },
            { field: 'reasonTypeID', errorMessage: 'Reason Type is missing in the protocol' },
            { field: 'workTypeID', errorMessage: 'Work Type is missing in the protocol' },
            { field: 'protocolStatusID', errorMessage: 'Protocol Status is missing in the protocol' },
            { field: 'customerID', errorMessage: 'Customer is missing in the protocol' },
        ];

        for (const { field, errorMessage } of requiredFields) {
            if (!protocol[field]) {
                throw new BadRequestException(errorMessage);
            }
        }
    }

    private async checkForbiddenException(protocolStaffID: number, staffID: number): Promise<void> {
        if (protocolStaffID !== staffID) {
            throw new ForbiddenException('You do not have the required permissions');
        }
    }
}
