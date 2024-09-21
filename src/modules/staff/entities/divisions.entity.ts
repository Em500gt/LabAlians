import { Staff } from "./staff.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Divisions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    division: string;

    @OneToMany(() => Staff, staff => staff.divisionID)
    staff: Staff[];
} 