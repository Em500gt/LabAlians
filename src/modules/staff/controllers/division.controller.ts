import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Divisions } from "../entities/divisions.entity";
import { DivisionService } from "../services/division.service";
import { DivisionDto } from "../dto/division.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Division')
@ApiBearerAuth()
@Controller('division')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class DivisionController {
    constructor(private divisionService: DivisionService) { }

    @Get()
    @ApiOperation({ summary: 'Получить список служб' })
    @ApiResponse({
        status: 200, description: 'Успешное получение списка cлужб', schema: {
            example: {
                id: 1,
                division: 'test'
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
    async getDivision(): Promise<Divisions[]> {
        return await this.divisionService.getDivision();
    }

    @Post()
    @ApiBody({ description: 'Данные для записи', type: DivisionDto })
    @ApiOperation({ summary: 'Создать новую службу' })
    @ApiResponse({ status: 201, description: 'Служба успешно создана' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    async createDivision(@Body() body: DivisionDto): Promise<{ message: string }> {
        return await this.divisionService.createDivision(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить службу' })
    @ApiResponse({ status: 200, description: 'Служба успешно удалена' })
    @ApiResponse({ status: 400, description: 'Невозможно удалить службу или связанные записи' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Служба не найдена' })
    @ApiResponse({ status: 500, description: 'Ошибка с удалением' })
    async deleteDivision(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.divisionService.deleteDivision(id);
    }
}