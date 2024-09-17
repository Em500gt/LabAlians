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
    @ApiOperation({ summary: 'Получить список всех типов заказчиков' })
    @ApiResponse({
        status: 200, description: 'Успешное получение списка типов заказчиков', schema: {
            example: {
                id: 1,
                type: "Individual"
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
    @CheckPermissions('canViewRecords')
    async findCustomerType(): Promise<CustomerTypes[]> {
        return await this.customerTypeService.findCustomerType();
    }

    @Post()
    @ApiOperation({ summary: 'Создать новый тип заказчика' })
    @ApiBody({ type: CustomerTypeDto })
    @ApiResponse({ status: 201, description: 'Тип заказчика успешно создан' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Не найдены данные в таблицах' })
    async createCustomerType(@Body() body: CustomerTypeDto): Promise<{ message: string }> {
        return await this.customerTypeService.createCustomerType(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить тип заказчика' })
    @ApiResponse({ status: 200, description: 'Тип заказчика успешно удален' })
    @ApiResponse({ status: 400, description: 'Невозможно удалить тип заказчика или связанные записи' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Тип заказчика не найден' })
    @ApiResponse({ status: 500, description: 'Ошибка с удалением' })
    async deleteCustomerType(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.customerTypeService.deleteCustomerType(id);
    }
}