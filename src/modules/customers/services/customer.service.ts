import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customers } from "../entities/customers.entity";
import { Repository } from "typeorm";
import { CustomerTypes } from "../entities/customer.type.entity";
import { CustomerCreateDto } from "../dto/customer.create.dto";
import { CustomerUpdateDto } from "../dto/customer.update.dto";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customers)
        private customersRepository: Repository<Customers>,

        @InjectRepository(CustomerTypes)
        private customersTypeRepository: Repository<CustomerTypes>
    ) { }

    async findCustomer(): Promise<Customers[]> {
        return this.customersRepository.find();
    }

    async createCustomer(body: CustomerCreateDto): Promise<{ message: string }> {
        try {
            const customerType = await this.customersTypeRepository.findOne({ where: { id: body.customerTypeID } });
            if (!customerType) {
                throw new BadRequestException('Customer type not found');
            }
            const customer = this.customersRepository.create({
                ...body,
                customerTypeID: customerType
            });
            await this.customersRepository.save(customer);

            return { message: `Customer ${customer.customerName} created successfully` };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async updateCustomer(id: number, body: CustomerUpdateDto): Promise<{ message: string }> {
        try {
            const customer = await this.customersRepository.findOne({ where: { id } })
            if (!customer) {
                throw new NotFoundException(`Customer with ID ${id} not found`);
            }

            let customerType = null;
            if (body.customerTypeID) {
                customerType = await this.customersTypeRepository.findOne({ where: { id: body.customerTypeID } })
                if (!customerType) {
                    throw new BadRequestException('Customer type not found');
                }
            }

            const updatedCustomer = this.customersRepository.merge(customer, {
                ...body,
                customerTypeID: customerType || customer.customerTypeID,
            });
            await this.customersRepository.save(updatedCustomer);

            return { message: `Customer ${updatedCustomer.customerName} updated successfully` };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async deleteCustomer(id: number): Promise<{ message: string }> {
        const deleteCustomer = await this.customersRepository.delete(id)
        if (deleteCustomer.affected === 0) {
            throw new NotFoundException(`Customer with ${id} not found`);
        }
        return { message: `Staff with ID ${id} successfully deleted` };
    }

}