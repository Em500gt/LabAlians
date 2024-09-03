import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Protocols } from "./protocols.entity";

@Entity()
export class ProtocolFiles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column({ type: "bytea" })
    pdfData: Buffer;

    @ManyToOne(() => Protocols, protocols => protocols.protocolfile)
    @JoinColumn({ name: " protocolID" })
    protocols: Protocols;
}