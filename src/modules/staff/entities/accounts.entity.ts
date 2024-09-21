import { StaffGroups } from "./staff.groups.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Staff } from "./staff.entity";

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    login: string;

    @Column()
    password: string;

    @ManyToOne(() => StaffGroups, staffGroup => staffGroup.accounts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "staffGroupID" })
    staffGroup: StaffGroups;

    @OneToOne(() => Staff, staff => staff.account, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "staffID" })
    staff: Staff;

}