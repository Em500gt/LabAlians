import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { CustomerTypes } from "./customer.type.entity";
import { Protocols } from "../../protocols/entities/protocols.entity";

@Entity()
export class Customers {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column({ unique: true })
    @Index()
    customerName: string;

    @Column()
    address: string;

    @Column({nullable: true})
    rasSch: string;

    @Column({nullable: true})
    unp: number;

    @Column({nullable: true})
    bank: string;

    @Column({nullable: true})
    bankAddress: string;

    @Column({nullable: true})
    bic: number;

    @Column({nullable: true})
    okpo: number;

    @Column({nullable: true})
    passport: string;

    @Column()
    phone: string;

    @Column({nullable: true})
    fax: string;

    @Column({nullable: true})
    email: string;

    @ManyToOne(() => CustomerTypes, customertype => customertype.customer)
    @JoinColumn({ name: "customerTypeID" })
    @Index()
    customerTypeID: CustomerTypes;

    @OneToMany(() => Protocols, protocols => protocols.customerID)
    protocols: Protocols[];
}