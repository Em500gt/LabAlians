import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Customers } from "./customers.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class CustomerTypes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany(() => Customers, customer => customer.customerTypeID)
    customer: Customers[];
}