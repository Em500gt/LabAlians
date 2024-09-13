import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IssueJournal } from "./issue.journal.entity";

@Entity()
export class IssueMethod {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    method: string;

    @OneToOne(() => IssueJournal, issuejournal => issuejournal.issueMethodID)
    issuejournalID: IssueJournal[];
}