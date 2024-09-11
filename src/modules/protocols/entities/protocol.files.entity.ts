import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Protocols } from "./protocols.entity";

@Entity()
export class ProtocolFiles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column({ type: "bytea" })
    pdfData: Buffer;

    @OneToOne(() => Protocols, protocols => protocols.protocolfile)
    @JoinColumn({ name: "protocolID" })
    protocolID: Protocols;
}