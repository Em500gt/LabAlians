import { Staff } from "./staff.entity";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Divisions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Index()
    division: string;

    @OneToMany(() => Staff, staff => staff.divisionID)
    staff: Staff[];
} 