import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerTypes } from "../entities/customer.type.entity";
import { CustomerTypeDto } from "../dto/customer.type.dto";

@Injectable()
export class CustomerTypeService {
    constructor(
        @InjectRepository(CustomerTypes)
        private customersTypeRepository: Repository<CustomerTypes>
    ) { }

    async findCustomerType(): Promise<CustomerTypes[]> {
        return await this.customersTypeRepository.find();
    }

    async createCustomerType(body: CustomerTypeDto): Promise<{ message: string }> {
        const customerTypeFind = await this.customersTypeRepository.findOne({ where: { type: body.type } })
        if (customerTypeFind) {
            throw new BadRequestException('Customer type already exists');
        }

        try {
            const customerType = await this.customersTypeRepository.save(body);
            return { message: `Customer type ${customerType.customer} created successfully` }
        } catch (error) {
            throw new BadRequestException('Error creating customer type');
        }
    }

    async deleteCustomerType(id: number): Promise<{message: string}>{
        const customerTypeFind = await this.customersTypeRepository.delete(id)
        if(customerTypeFind.affected === 0){
            throw new NotFoundException(`Customer type with ${id} not found`);
        }
        return {message: `Customer type with ID ${id} succesfully deleted`}
    }
}
