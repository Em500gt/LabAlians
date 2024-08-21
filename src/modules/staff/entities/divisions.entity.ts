import { Staff } from "src/modules/staff/entities/staff.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Divisions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    division: string;

    @OneToMany(() => Staff, staff => staff.division)
    staff: Staff[];
} 