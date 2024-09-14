import { Accounts } from "./accounts.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StaffGroups {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    staffGroup: string; 

    @Column()
    canViewRecords: boolean;

    @Column()
    canAddRecords: boolean;

    @Column()
    canEditRecords: boolean;

    @Column()
    canDeleteRecords: boolean;

    @Column()
    canAccessFiles: boolean;

    @Column()
    fullAccess: boolean;

    @OneToMany(() => Accounts, accounts => accounts.staffGroup)
    accounts: Accounts[];
}