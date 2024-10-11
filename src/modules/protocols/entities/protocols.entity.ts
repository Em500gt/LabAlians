import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProtocolStatus } from "./protocol.status.entity";
import { ProtocolFiles } from "./protocol.files.entity";
import { WorkType } from "./work.type.entity";
import { ReasonType } from "./reason.type.entity";
import { Customers } from "../../customers/entities/customers.entity";
import { Staff } from "../../staff/entities/staff.entity";
import { IssueJournal } from "../../journal/entities/issue.journal.entity";

@Entity()
export class Protocols {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column({ type: 'boolean', default: false })
    isAccreditation: boolean;

    @Column()
    creationDate: Date;

    @Column()
    workDate: Date;

    @Column()
    workObject: string;

    @Column({ default: 1 })
    copies: number;

    @Column({ nullable: true })
    workSheetNum: number;

    @Column({ default: false })
    isLssied: boolean;

    @Column({ nullable: true, default: undefined })
    note: string;

    @ManyToOne(() => ReasonType, reasontype => reasontype.protocols, { nullable: true })
    @JoinColumn(({ name: "reasonTypeID" }))
    @Index()
    reasonTypeID: ReasonType;

    @ManyToOne(() => WorkType, worktype => worktype.protocols, { nullable: true })
    @JoinColumn({ name: "workTypeID" })
    @Index()
    workTypeID: WorkType;

    @OneToOne(() => ProtocolFiles, protocolfile => protocolfile.protocolID, { nullable: true })
    protocolfile: ProtocolFiles;

    @ManyToOne(() => ProtocolStatus, protocolstatus => protocolstatus.protocols, { nullable: true })
    @JoinColumn({ name: "protocolStatusID" })
    @Index()
    protocolStatusID: ProtocolStatus;

    @ManyToOne(() => Customers, customers => customers.protocols, { nullable: true })
    @JoinColumn({ name: "customerID" })
    @Index()
    customerID: Customers;

    @ManyToOne(() => Staff, staff => staff.protocols)
    @JoinColumn({ name: "staffID" })
    @Index()
    staffID: Staff;

    @OneToOne(() => IssueJournal, issueJournal => issueJournal.protocolID)
    issueJournalID: IssueJournal;
}