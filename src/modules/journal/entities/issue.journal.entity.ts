import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { IssueMethod } from "./issue.method.entity";
import { Protocols } from "../../protocols/entities/protocols.entity";

@Entity()
export class IssueJournal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @ManyToOne(() => IssueMethod, issuemethod => issuemethod.issuejournalID)
    @JoinColumn({ name: "issueMethodID" })
    issueMethodID: IssueMethod;

    @OneToOne(() => Protocols, protocols => protocols.issueJournalID)
    @JoinColumn({ name: "protocolID" })
    protocolID: Protocols;
}