import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Protocols } from "./protocols.entity";

@Entity()
export class WorkType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    type: string;

    @OneToMany(() => Protocols, protocols => protocols.workTypeID)
    protocols: Protocols[];
}