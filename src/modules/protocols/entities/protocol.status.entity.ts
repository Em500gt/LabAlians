import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Protocols } from "./protocols.entity";

@Entity()
export class ProtocolStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    status: string;

    @OneToMany(() => Protocols, protocols => protocols.protocolStatusID)
    protocols: Protocols[];
}