import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { PositionService } from "../services/position.service";
import { Positions } from "../entities/positions.entity";
import { PositionDto } from "../dto/position.dto";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Position')
@ApiBearerAuth()
@Controller('position')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class PositionController {
    constructor(private positionService: PositionService) { }

    @Get()
    @ApiOperation({ summary: 'Получить список должностей' })
    @ApiResponse({
        status: 200, description: 'Успешное получение списка должностей', schema: {
            example: {
                id: 1,
                position: 'test'
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
    async getPosition(): Promise<Positions[]> {
        return await this.positionService.getPosition();
    }

    @Post()
    @ApiBody({ type: PositionDto })
    @ApiOperation({ summary: 'Создать новую должность' })
    @ApiResponse({ status: 201, description: 'Должность успешно создана' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    async createPosition(@Body() body: PositionDto): Promise<{ message: string }> {
        return await this.positionService.createPosition(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить должность' })
    @ApiResponse({ status: 200, description: 'Должность успешно удалена' })
    @ApiResponse({ status: 400, description: 'Невозможно удалить должность или связанные записи' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Должность не найдена' })
    @ApiResponse({ status: 500, description: 'Ошибка с удалением' })
    async deletePosition(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.positionService.deletePosition(id);
    }
}