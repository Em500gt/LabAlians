import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Protocols } from "./protocols.entity";

@Entity()
export class ReasonType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany(() => Protocols, protocols => protocols.reasonTypeID)
    protocols: Protocols[];

    /// Основание по которому протокол делается 
}