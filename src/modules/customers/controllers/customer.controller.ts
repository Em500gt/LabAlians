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
    @ApiOperation({ summary: 'Получить список всех заказчиков' })
    @ApiResponse({
        status: 200, description: 'Успешное получение списка заказчиков', schema: {
            example: {
                "id": 1,
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
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
    @CheckPermissions('canViewRecords')
    async findCustomer(): Promise<Customers[]> {
        return this.customerService.findCustomer();
    }

    @Post()
    @ApiOperation({ summary: 'Создать нового Заказчика' })
    @ApiBody({ type: CustomerCreateDto })
    @ApiResponse({ status: 201, description: 'Заказчик успешно создан' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Не найдены данные в таблицах' })
    @CheckPermissions('canAddRecords')
    async createCustomer(@Body() body: CustomerCreateDto): Promise<{ message: string }> {
        return await this.customerService.createCustomer(body);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить информацию о заказчике' })
    @ApiBody({
        schema: {
            example: {
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
                email: "test@gmail.com",
                customerTypeID: 1
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Заказчик успешно обновлен' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Не найдены данные в таблицах' })
    @CheckPermissions('canEditRecords')
    async updateCustomer(@Param('id', ValidateIdPipe) id: number, @Body() body: CustomerUpdateDto): Promise<{ message: string }> {
        return await this.customerService.updateCustomer(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить заказчика' })
    @ApiResponse({ status: 200, description: 'Заказчик успешно удален' })
    @ApiResponse({ status: 400, description: 'Невозможно удалить заказчика или связанные записи' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Заказчик не найден' })
    @ApiResponse({ status: 500, description: 'Ошибка с удалением' })
    async deleteCustomer(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.customerService.deleteCustomer(id);
    }
}