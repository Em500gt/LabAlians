import { Accounts } from "src/modules/staff/entities/accounts.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserGroups {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userGroup: string; //User or Admin

    @Column()
    addRec: boolean;

    @Column()
    delRec: boolean;

    @Column()
    filesAccess: boolean;

    @Column()
    fullAccess: boolean;

    @OneToMany(() => Accounts, account => account.userGroup)
    account: Accounts[];
}