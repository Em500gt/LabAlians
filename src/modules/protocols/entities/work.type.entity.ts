import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Protocols } from "./protocols.entitiy";

@Entity()
export class WorkType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany(() => Protocols, protocols => protocols.worktype)
    protocols: Protocols[];
}