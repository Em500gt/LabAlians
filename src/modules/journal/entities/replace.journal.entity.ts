import { Protocols } from "src/modules/protocols/entities/protocols.entitiy";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReplaceJournal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    oldProtocolID: number;

    @Column()
    newProtocolID: number;

    @Column()
    reason: string;

    @OneToMany(() => Protocols, protocols => protocols.replacejournal)
    protocols: Protocols[];
}