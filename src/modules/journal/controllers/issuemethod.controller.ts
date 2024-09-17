import { Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { IssueMethodService } from "../services/issuemethod.service";
import { IssueMethod } from "../entities/issue.method.entity";
import { IssueMethodDto } from "../dto/issue.method.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Issue method')
@ApiBearerAuth()
@Controller('issuemethod')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class IssueMethodController {
    constructor(private readonly issueMethodService: IssueMethodService) { }

    @Get()
    @ApiOperation({ summary: 'Получить список методов выдачи' })
    @ApiResponse({ status: 200, description: 'Успешное получение списка методов', type: [IssueMethodDto] })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
    @CheckPermissions('canViewRecords')
    async getIssueMethod(): Promise<IssueMethod[]> {
        return await this.issueMethodService.getIssueMethod();
    }

    @Post()
    @ApiBody({ type: [IssueMethodDto] })
    @ApiOperation({ summary: 'Создать нового метода выдачи' })
    @ApiResponse({ status: 201, description: 'Метод выдачи успешно создан' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    async createIssueMethod(body: IssueMethodDto): Promise<{ message: string }> {
        return this.issueMethodService.createIssueMethod(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить метод выдачи' })
    @ApiResponse({ status: 200, description: 'Метод выдачи успешно удален' })
    @ApiResponse({ status: 400, description: 'Невозможно удалить метод выдачи или связанные записи' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Метод выдачи не найден' })
    @ApiResponse({ status: 500, description: 'Ошибка с удалением' })
    async deleteIssueMethod(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.issueMethodService.deleteIssueMethod(id);
    }
}