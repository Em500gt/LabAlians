import { Accounts } from "src/modules/staff/entities/accounts.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StaffGroups {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    userGroup: string; // User, Admin, etc.

    @Column()
    canAddRecords: boolean;

    @Column()
    canEditRecords: boolean;

    @Column()
    canDeleteRecords: boolean;

    @Column()
    canAccessFiles: boolean;

    @OneToMany(() => Accounts, accounts => accounts.staffGroup)
    accounts: Accounts[];

}