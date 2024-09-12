import { Customers } from './entities/customers.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerTypes } from './entities/customer.type.entity';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { CustomerTypeController } from './controllers/customertype.controller';
import { CustomerTypeService } from './services/customertype.service';

@Module({
    imports: [TypeOrmModule.forFeature([Customers, CustomerTypes])],
    controllers: [CustomerController, CustomerTypeController],
    providers: [CustomerService, CustomerTypeService],
    exports: [TypeOrmModule]
})
export class CustomersModule { }
