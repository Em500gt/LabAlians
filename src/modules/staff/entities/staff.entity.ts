import { Protocols } from "../../protocols/entities/protocols.entity";
import { Accounts } from "./accounts.entity";
import { Divisions } from "./divisions.entity";
import { Positions } from "./positions.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity()
export class Staff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ unique: true })
    tabelNum: number;

    @ManyToOne(() => Positions, position => position.staff)
    @JoinColumn({ name: "positionID" })
    positionID: Positions;

    @OneToOne(() => Accounts, account => account.staff,  { cascade: true, onDelete: 'CASCADE' })
    account: Accounts;

    @ManyToOne(() => Divisions, division => division.staff)
    @JoinColumn({ name: "divisionID" })
    divisionID: Divisions;

    @OneToMany(() => Protocols, protocols => protocols.staff)
    protocols: Protocols[];
}