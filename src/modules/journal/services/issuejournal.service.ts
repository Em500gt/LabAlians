import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IssueJournal } from "../entities/issue.journal.entity";
import { Repository } from "typeorm";

@Injectable()
export class IssueJournalService {
    constructor(
        @InjectRepository(IssueJournal)
        private readonly issueJournalRepository: Repository<IssueJournal>
    ) { }

    async getIssueJournal(year?: number, issueMethodID?: number): Promise<IssueJournal[]> {
        const query = this.issueJournalRepository.createQueryBuilder('issueJournal')
            .leftJoinAndSelect('issueJournal.issueMethodID', 'issueMethod')
            .leftJoinAndSelect('issueJournal.protocolID', 'protocol');

        if (year) {
            query.andWhere('EXTRACT(YEAR FROM issueJournal.date) = :year', { year });
        }

        if (issueMethodID) {
            query.andWhere('issueJournal.issueMethodID = :issueMethodID', { issueMethodID });
        }

        query.orderBy('issueJournal.date', 'DESC');

        return await query.getMany();
    }
}