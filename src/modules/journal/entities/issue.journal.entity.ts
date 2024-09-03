import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { IssueMethod } from "./issue.method.entity";
import { Protocols } from "../../protocols/entities/protocols.entity";

@Entity()
export class IssueJournal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    protocolID: number;

    @Column()
    date: Date;

    @Column()
    note: string;

    @ManyToOne(() => IssueMethod, issuemethod => issuemethod.issuejournal)
    @JoinColumn({ name: "issueMethodID" })
    issuemethod: IssueMethod;

    @OneToMany(() => Protocols, protocols => protocols.issuejournal)
    protocols: Protocols[];
}