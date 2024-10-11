import { Staff } from "./staff.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
export class Positions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Index()
    position: string;

    @OneToMany(() => Staff, staff => staff.positionID, { onDelete: 'CASCADE' })
    staff: Staff[];
}