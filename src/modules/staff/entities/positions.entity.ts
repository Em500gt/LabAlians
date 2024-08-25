import { Staff } from "src/modules/staff/entities/staff.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Positions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    position: string; // Начальник лаборатории, Мастер, Инженер 1 кат., Инженер 2 кат., Инженер.

    @OneToMany(() => Staff, staff => staff.positionID, { onDelete: 'CASCADE' })
    staff: Staff[];
}