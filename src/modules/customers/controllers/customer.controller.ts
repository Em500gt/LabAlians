import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { Customers } from "../entities/customers.entity";
import { CustomerService } from "../services/customer.service";
import { CustomerCreateDto, CustomerUpdateDto } from "../dto/customer.create.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Customer')
@ApiBearerAuth()
@Controller('customer')
@CheckPermissions('fullAccess')
@UseGuards(PermissionsGuard)
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    @Get()
    @ApiOperation({ summary: 'Get a list of all customers' })
    @ApiResponse({
        status: 200, schema: {
            example: [{
                id: 1,
                customerName: "Test",
                address: "Test",
                rasSch: "123353424",
                unp: 123456789,
                bank: "Test",
                bankAddress: "Test",
                bic: 123456789,
                okpo: 12345789,
                passport: "Test",
                phone: "+375291111111",
                fax: "+375291111111",
                email: "test@gmail.com"
            }]
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @CheckPermissions('canViewRecords')
    async findCustomer(): Promise<Customers[]> {
        return this.customerService.findCustomer();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new Customer' })
    @ApiBody({ type: CustomerCreateDto })
    @ApiResponse({ status: 201, description: `Customer created successfully` })
    @ApiResponse({ status: 400, description: 'Customer already exists' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'Customer type not found' })
    @CheckPermissions('canAddRecords')
    async createCustomer(@Body() body: CustomerCreateDto): Promise<{ message: string }> {
        return await this.customerService.createCustomer(body);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update customer information' })
    @ApiBody({ type: CustomerUpdateDto })
    @ApiResponse({ status: 200, description: 'Customer updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({
        status: 404,
        description: `
        Possible errors:
        - Customer with ID not found
        - Customer type not found
        `
    })
    @CheckPermissions('canEditRecords')
    async updateCustomer(@Param('id', ValidateIdPipe) id: number, @Body() body: CustomerUpdateDto): Promise<{ message: string }> {
        return await this.customerService.updateCustomer(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete customer' })
    @ApiResponse({ status: 200, description: 'Customer with ID successfully deleted' })
    @ApiResponse({ status: 400, description: 'Cannot delete customer with ID, as it is still referenced by other entities' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'Customer with ID not found' })
    @ApiResponse({ status: 500, description: 'Error deleting customer' })
    async deleteCustomer(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.customerService.deleteCustomer(id);
    }
}