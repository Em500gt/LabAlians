import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Customers } from "./customers.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class CustomerTypes {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор типа заказчика' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Корпоративный клиент', description: 'Название типа заказчика' })
    @Column()
    type: string;

    @ApiProperty({ example: 'Описание типа клиента', description: 'Описание типа заказчика' })
    @OneToMany(() => Customers, customer => customer.customerTypeID)
    customer: Customers[];
}