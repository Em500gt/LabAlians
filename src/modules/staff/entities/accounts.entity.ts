import { StaffGroups } from "./staff.groups.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Staff } from "./staff.entity";

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    login: string;

    @Column()
    password: string;

    @OneToOne(() => StaffGroups, staffGroup => staffGroup.accounts)
    @JoinColumn({ name: "staffGroupID" })
    staffGroup: StaffGroups;

    @OneToOne(() => Staff, staff => staff.account)
    @JoinColumn({ name: "staffID" })
    staff: Staff;

}