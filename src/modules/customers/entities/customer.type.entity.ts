import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Customers } from "./customers.entity";

@Entity()
export class CustomerTypes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany(() => Customers, customer => customer.customertype)
    customer: Customers[];
}