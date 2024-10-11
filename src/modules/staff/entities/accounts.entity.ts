import { StaffGroups } from "./staff.groups.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Staff } from "./staff.entity";

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column({ unique: true })
    @Index()
    login: string;

    @Column()
    password: string;

    @ManyToOne(() => StaffGroups, staffGroup => staffGroup.accounts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "staffGroupID" })
    @Index()
    staffGroup: StaffGroups;

    @OneToOne(() => Staff, staff => staff.account, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "staffID" })
    @Index()
    staff: Staff;

}