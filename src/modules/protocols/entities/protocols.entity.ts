import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProtocolStatus } from "./protocol.status.entity";
import { ProtocolFiles } from "./protocol.files.entity";
import { WorkType } from "./work.type.entity";
import { ReasonType } from "./reason.type.entity";
// import { ReplaceJournal } from "../../journal/entities/replace.journal.entity";
// import { IssueJournal } from "../../journal/entities/issue.journal.entity";
import { Customers } from "../../customers/entities/customers.entity";
import { Staff } from "../../staff/entities/staff.entity";

@Entity()
export class Protocols {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isAccreditation: boolean;

    @Column()
    creationDate: Date;

    @Column()
    workDate: string;

    @Column()
    workObject: string;

    @Column()
    copies: number;

    @Column()
    workSheetNum: number;

    @Column()
    isLssied: number;

    @Column()
    note: string;

    @ManyToOne(() => ReasonType, reasontype => reasontype.protocols)
    @JoinColumn(({ name: "reasonTypeID" }))
    reasonTypeID: ReasonType;

    @ManyToOne(() => WorkType, worktype => worktype.protocols)
    @JoinColumn({ name: "workTypeID" })
    workTypeID: WorkType;

    // @OneToOne(() => ProtocolFiles, protocolfile => protocolfile.protocolID)
    // protocolfile: ProtocolFiles[];

    @ManyToOne(() => ProtocolStatus, protocolstatus => protocolstatus.protocols)
    @JoinColumn({ name: "protocolStatusID" })
    protocolStatusID: ProtocolStatus;

    // @ManyToOne(() => ReplaceJournal, replacejournal => replacejournal.protocols)
    // @JoinColumn({ name: "replaceJournalID" })
    // replacejournal: ReplaceJournal;

    // @ManyToOne(() => IssueJournal, issuejournal => issuejournal.protocols)
    // @JoinColumn({ name: "issueJournalID" })
    // issuejournal: IssueJournal;

    @ManyToOne(() => Customers, customers => customers.protocols)
    @JoinColumn({ name: "customerID" })
    customerID: Customers;

    @ManyToOne(() => Staff, staff => staff.protocols)
    @JoinColumn({ name: "staffID" })
    staffID: Staff;
}