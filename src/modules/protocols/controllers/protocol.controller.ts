import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ProtocolService } from "../services/protocol.service";
import { Protocols } from "../entities/protocols.entity";
import { ProtocolCreateDto, ProtocolUpdateDto } from "../dto/protocol.dto";
import { IStaff } from "auth/types/types";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { IssueJournalDto } from "modules/journal/dto/issue.journal.dto";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Protocol')
@ApiBearerAuth()
@Controller('protocol')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class ProtocolController {
    constructor(private protocolService: ProtocolService) { }

    @Get()
    @ApiOperation({ summary: 'Получить список всех протоколов в зависимости от года' })
    @ApiResponse({
        status: 200, description: 'Успешное получение списка протоколов', schema: {
            example: {
                id: 7,
                isAccreditation: true,
                creationDate: "2024-09-14T13:23:36.126Z",
                workDate: "2024-09-13T00:00:00.000Z",
                workObject: "Home Test",
                copies: 1,
                workSheetNum: 1300,
                isLssied: false,
                note: null,
                staffID: {
                    id: 2,
                    firstname: "Test",
                    lastname: "Test",
                    tabelNum: 1300
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
    @CheckPermissions('canViewRecords')
    async getProtocols(@Query('year') year?: number): Promise<Protocols[]> {
        return await this.protocolService.getProtocols(year);
    }

    @Post()
    @ApiOperation({ summary: 'Создать новый протокол' })
    @ApiBody({
        description: 'Данные для записи', schema: {
            example: {
                isAccreditation: true,
                workDate: "2024-09-13T00:00:00.000Z",
                workObject: "Home Test",
                copies: 1,
                workSheetNum: 1300,
                note: null,
                reasonTypeID: 1,
                workTypeID: 1,
                protocolStatusID: 1,
                customerID: 1
            }
        }
    })
    @ApiResponse({ status: 201, description: 'Протокол успешно создан' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Не найдены данные в таблицах' })
    @CheckPermissions('canAddRecords')
    async createProtocol(@Req() req: { user: IStaff }, @Body() body: ProtocolCreateDto): Promise<{ message: string }> {
        return await this.protocolService.createProtocol(req.user.id, body);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить информацию о протоколе' })
    @ApiBody({
        description: 'Данные для записи', schema: {
            example: {
                isAccreditation: true,
                workDate: "2024-09-13T00:00:00.000Z",
                workObject: "Home Test",
                copies: 1,
                workSheetNum: 1300,
                note: null,
                reasonTypeID: 1,
                workTypeID: 1,
                protocolStatusID: 1,
                customerID: 1
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Протокол успешно обновлен' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Не найдены данные в таблицах' })
    @CheckPermissions('canEditRecords')
    async updateProtocol(@Param('id', ValidateIdPipe) id: number, @Body() body: ProtocolUpdateDto): Promise<{ message: string }> {
        return await this.protocolService.updateProtocol(id, body);
    }

    @Post(':id/issue')
    @ApiOperation({ summary: 'Выдача протокола заказчику' })
    @ApiResponse({ status: 200, description: 'Выдача успешно выполнена' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Не найдены данные в таблицах' })
    @ApiResponse({ status: 500, description: 'Ошибка с транзакцией базы данных' })
    @CheckPermissions('canAddRecords')
    async issueProtocol(@Param('id', ValidateIdPipe) id: number, @Body() body: IssueJournalDto): Promise<{ message: string }> {
        return await this.protocolService.issueProtocol(id, body);
    }
}