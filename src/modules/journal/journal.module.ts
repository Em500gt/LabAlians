import { Module } from '@nestjs/common';
import { IssueJournal } from './entities/issue.journal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueMethod } from './entities/issue.method.entity';
import { IssueJournalController } from './controllers/issuejournal.controller';
import { IssueMethodController } from './controllers/issuemethod.controller';
import { IssueMethodService } from './services/issuemethod.service';
import { IssueJournalService } from './services/issuejournal.service';

@Module({
    imports: [TypeOrmModule.forFeature([IssueJournal, IssueMethod])],
    controllers: [IssueJournalController, IssueMethodController],
    providers: [IssueMethodService, IssueJournalService]
})

export class JournalModule { }