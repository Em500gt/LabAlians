import { Protocols } from "../../protocols/entities/protocols.entity";
import { Accounts } from "./accounts.entity";
import { Divisions } from "./divisions.entity";
import { Positions } from "./positions.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne, Index } from "typeorm";

@Entity()
export class Staff {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ unique: true })
    @Index()
    tabelNum: number;

    @ManyToOne(() => Positions, position => position.staff)
    @JoinColumn({ name: "positionID" })
    @Index()
    positionID: Positions;

    @OneToOne(() => Accounts, account => account.staff,  { cascade: true, onDelete: 'CASCADE' })
    account: Accounts;

    @ManyToOne(() => Divisions, division => division.staff)
    @JoinColumn({ name: "divisionID" })
    @Index()
    divisionID: Divisions;

    @OneToMany(() => Protocols, protocols => protocols.staffID)
    protocols: Protocols[];
}