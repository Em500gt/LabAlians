import { Module } from '@nestjs/common';
import { IssueJournal } from './entities/issue.journal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueMethod } from './entities/issue.method.entity';
import { ReplaceJournal } from './entities/replace.journal.entity';

@Module({
    imports: [TypeOrmModule.forFeature([IssueJournal, ReplaceJournal, IssueMethod])]
})
export class JournalModule { }
