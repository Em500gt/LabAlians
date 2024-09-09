import { Controller, Get, UseGuards, Post, Body, Param, Delete } from "@nestjs/common";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CustomerTypeDto } from "../dto/customer.type.dto";
import { CustomerTypeService } from "../services/customertype.service";
import { CustomerTypes } from "../entities/customer.type.entity";
import { ValidateIdPipe } from "pipes/validate.id.pipe";

@Controller('customertype')
@UseGuards(PermissionsGuard)
export class CustomerTypeController {
    constructor(private customerTypeService: CustomerTypeService) { }

    @Get()
    async findCustomerType(): Promise<CustomerTypes[]> {
        return await this.customerTypeService.findCustomerType();
    }

    @Post()
    async createCustomerType(@Body() body: CustomerTypeDto): Promise<{ message: string }> {
        return await this.customerTypeService.createCustomerType(body);
    }

    @Delete(':id')
    async deleteCustomerType(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.customerTypeService.deleteCustomerType(id);
    }
}