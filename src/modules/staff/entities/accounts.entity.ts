import { UserGroups } from "./user.groups.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Staff } from "./staff.entity";

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @ManyToOne(() => UserGroups, userGroup => userGroup.account)
    @JoinColumn({ name: "userGroupID" })
    userGroup: UserGroups;

    @ManyToOne(() => Staff, staff => staff.account)
    @JoinColumn({ name: "staffID" })
    staff: Staff;

}