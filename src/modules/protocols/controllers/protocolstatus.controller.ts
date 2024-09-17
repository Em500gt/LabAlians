import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProtocolStatus } from "../entities/protocol.status.entity";
import { ProtocolStatusService } from "../services/protocolstatus.services";
import { ProtocolStatusDto } from "../dto/protocol.status.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Protocol status')
@ApiBearerAuth()
@Controller('protocolstatus')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class ProtocolStatusController {
    constructor(private protocolStatusService: ProtocolStatusService) { }

    @Get()
    @ApiOperation({ summary: 'Получить список всех статусов протокола' })
    @ApiResponse({ type: ProtocolStatusDto })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
    @CheckPermissions('canViewRecords')
    async getProtocolStatus(): Promise<ProtocolStatus[]> {
        return await this.protocolStatusService.getProtocolStatus();
    }

    @Post()
    @ApiOperation({ summary: 'Создать статус протокола' })
    @ApiBody({ type: ProtocolStatusDto })
    @ApiResponse({ status: 201, description: 'Статус протокола успешно создан' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Не найдены данные в таблицах' })
    async createProtocolStatus(@Body() body: ProtocolStatusDto): Promise<{ message: string }> {
        return await this.protocolStatusService.createProtocolStatus(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить статус' })
    @ApiResponse({ status: 200, description: 'Статус успешно удален' })
    @ApiResponse({ status: 400, description: 'Невозможно удалить статус или связанные записи' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Статус не найден' })
    @ApiResponse({ status: 500, description: 'Ошибка с удалением' })
    async deleteProtocolStatus(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.protocolStatusService.deleteProtocolStatus(id);
    }
}