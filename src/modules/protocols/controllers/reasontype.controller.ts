import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ReasonTypeService } from "../services/reasontype.service";
import { ReasonType } from "../entities/reason.type.entity";
import { ReasonTypeDto } from "../dto/reason.type.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Reason type')
@ApiBearerAuth()
@Controller('reasontype')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class ReasonTypeController {
    constructor(private reasonTypeService: ReasonTypeService) { }

    @Get()
    @ApiOperation({ summary: 'Получить список оснований для работы' })
    @ApiResponse({
        status: 200, description: 'Успешное получение списка оснований', schema: {
            example: {
                id: 1,
                type: 'test'
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
    @CheckPermissions('canViewRecords')
    async getReasonType(): Promise<ReasonType[]> {
        return await this.reasonTypeService.getReasonType();
    }

    @Post()
    @ApiBody({ description: 'Данные для записи', type: ReasonTypeDto })
    @ApiOperation({ summary: 'Создать новое основание для работы' })
    @ApiResponse({ status: 201, description: 'Основание для работы успешно создано' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    async createReasonType(@Body() body: ReasonTypeDto): Promise<{ message: string }> {
        return await this.reasonTypeService.createReasonType(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить основание для работы' })
    @ApiResponse({ status: 200, description: 'Основание для работы успешно удалено' })
    @ApiResponse({ status: 400, description: 'Невозможно удалить основание для работы или связанные записи' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Основание для работы не найдено' })
    @ApiResponse({ status: 500, description: 'Ошибка с удалением' })
    async deleteReasonType(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return this.reasonTypeService.deleteReasonType(id);
    }
}