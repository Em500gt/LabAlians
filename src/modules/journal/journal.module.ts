import { Module } from '@nestjs/common';
import { IssueJournal } from './entities/issue.journal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueMethod } from './entities/issue.method.entity';

@Module({
    imports: [TypeOrmModule.forFeature([IssueJournal, IssueMethod])],
    controllers: [],
    providers: []
})

export class JournalModule { }