import { Protocols } from "src/modules/protocols/entities/protocols.entitiy";
import { Accounts } from "src/modules/staff/entities/accounts.entity";
import { Divisions } from "src/modules/staff/entities/divisions.entity";
import { Positions } from "src/modules/staff/entities/positions.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity()
export class Staff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({unique: true})
    tabelNum: number;

    @ManyToOne(() => Positions, position => position.staff)
    @JoinColumn({ name: "positionID" })
    positionID: Positions;

    @OneToOne(() => Accounts, account => account.staff)
    account: Accounts; 

    @ManyToOne(() => Divisions, division => division.staff)
    @JoinColumn({ name: "divisionID" })
    divisionID: Divisions;

    @OneToMany(() => Protocols, protocols => protocols.staff)
    protocols: Protocols[];
}