import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { CustomerTypes } from "./customer.type.entity";
import { Protocols } from "src/modules/protocols/entities/protocols.entitiy";

@Entity()
export class Customers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerName: string;

    @Column()
    address: string;

    @Column()
    rasSch: string;

    @Column()
    unp: number;

    @Column()
    bank: string;

    @Column()
    bankAddress: string;

    @Column()
    bic: number;

    @Column()
    okpo: number;

    @Column()
    passport: string;

    @Column()
    phone: string;

    @Column()
    fax: string;

    @Column()
    email: string;

    @ManyToOne(() => CustomerTypes, customertype => customertype.customer)
    @JoinColumn({ name: "customerTypeID" })
    customertype: CustomerTypes;

    @OneToMany(() => Protocols, protocols => protocols.customers)
    protocols: Protocols[];
}