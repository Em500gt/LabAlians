import { Customers } from './entities/customers.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerTypes } from './entities/customer.type.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Customers, CustomerTypes])],
})
export class CustomersModule { }
