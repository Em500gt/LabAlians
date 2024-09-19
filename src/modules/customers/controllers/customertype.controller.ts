import { Controller, Get, UseGuards, Post, Body, Param, Delete } from "@nestjs/common";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CustomerTypeDto } from "../dto/customer.type.dto";
import { CustomerTypeService } from "../services/customertype.service";
import { CustomerTypes } from "../entities/customer.type.entity";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Customer type')
@ApiBearerAuth()
@Controller('customertype')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class CustomerTypeController {
    constructor(private customerTypeService: CustomerTypeService) { }

    @Get()
    @ApiOperation({ summary: 'Get a list of all customer types' })
    @ApiResponse({ status: 200, type: CustomerTypeDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @CheckPermissions('canViewRecords')
    async findCustomerType(): Promise<CustomerTypes[]> {
        return await this.customerTypeService.findCustomerType();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new customer type' })
    @ApiBody({ type: CustomerTypeDto })
    @ApiResponse({ status: 201, description: 'Customer type created successfully' })
    @ApiResponse({
        status: 400,
        description: `
        Possible errors:
        - Error creating customer type
        - Customer type already exists
        `
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    async createCustomerType(@Body() body: CustomerTypeDto): Promise<{ message: string }> {
        return await this.customerTypeService.createCustomerType(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete customer type' })
    @ApiResponse({ status: 200, description: 'Customer type with ID succesfully deleted' })
    @ApiResponse({ status: 400, description: 'Cannot delete customer type with ID, as it is still referenced by other entities' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'Customer type with not found' })
    @ApiResponse({ status: 500, description: 'Error deleting customer type' })
    async deleteCustomerType(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.customerTypeService.deleteCustomerType(id);
    }
}