import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { Customers } from "../entities/customers.entity";
import { CustomerService } from "../services/customer.service";
import { CustomerCreateDto } from "../dto/customer.create.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { CustomerUpdateDto } from "../dto/customer.update.dto";

@Controller('customer')
@UseGuards(PermissionsGuard)
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    @Get()
    // @CheckPermissions('canEditRecords')
    async findCustomer(): Promise<Customers[]> {
        return this.customerService.findCustomer();
    }

    @Post()
    // @CheckPermissions('canEditRecords')
    async createCustomer(@Body() body: CustomerCreateDto): Promise<{ message: string }> {
        return await this.customerService.createCustomer(body);
    }

    @Patch(':id')
    async updateCustomer(@Param('id', ValidateIdPipe) id: number, @Body() body: CustomerUpdateDto): Promise<{ message: string }> {
        return await this.customerService.updateCustomer(id, body);
    }

    @Delete(':id')
    async deleteCustomer(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.customerService.deleteCustomer(id);
    }
}