import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { WorkType } from "../entities/work.type.entity";
import { WorkTypeService } from "../services/worktype.service";
import { WorkTypeDto } from "../dto/work.type.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Work type')
@ApiBearerAuth()
@Controller('worktype')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class WorkTypeController {
    constructor(private workTypeService: WorkTypeService) { }

    @Get()
    @CheckPermissions('canViewRecords')
    @ApiOperation({ summary: 'Получить список работ' })
    @ApiResponse({
        status: 200, description: 'Успешное получение списка работ', schema: {
            example: {
                id: 1,
                type: 'test'
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
    async getWorkType(): Promise<WorkType[]> {
        return await this.workTypeService.getWorkType();
    }

    @Post()
    @ApiBody({ description: 'Данные для записи', type: WorkTypeDto })
    @ApiOperation({ summary: 'Создать новую работу' })
    @ApiResponse({ status: 201, description: 'Работа успешно создана' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    async createWorkType(@Body() body: WorkTypeDto): Promise<{ message: string }> {
        return await this.workTypeService.createWorkType(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить работу' })
    @ApiResponse({ status: 200, description: 'Работа успешно удалена' })
    @ApiResponse({ status: 400, description: 'Невозможно удалить работу или связанные записи' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Работа не найдена' })
    @ApiResponse({ status: 500, description: 'Ошибка с удалением' })
    async deleteWorkType(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.workTypeService.deleteWorkType(id);
    }
}