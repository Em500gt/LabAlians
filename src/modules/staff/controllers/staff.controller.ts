import { Controller, Delete, Get, Param, Patch, Post, Body, UseGuards, Req, BadRequestException } from "@nestjs/common";
import { StaffService } from "../services/staff.service";
import { Staff } from "../entities/staff.entity";
import { CombinedDto, CombinedUpdateDto } from "../dto/combined.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('Staff')
@ApiBearerAuth()
@Controller('staff')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class StaffController {
    constructor(private staffService: StaffService) { }

    @Get()
    @ApiOperation({ summary: 'Получить список всех сотрудников' })
    @ApiResponse({
        status: 200, description: 'Успешное получение списка сотрудников', schema: {
            example: {
                id: 1,
                firstname: 'test',
                lastname: 'test',
                tabelNum: 1300,
                position: 1,
                division: 1
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
    async findStaff(): Promise<Staff[]> {
        return await this.staffService.findStaff();
    }

    @Post()
    @ApiOperation({ summary: 'Создать нового сотрудника' })
    @ApiBody({
        description: 'Данные для записи', schema: {
            example: {
                firstname: 'John',
                lastname: 'Doe',
                tabelNum: 123,
                positionID: 1,
                divisionID: 1,
                login: 'johndoe',
                password: 'P@ssw0rd',
                staffGroupID: 1
            }
        }

    })
    @ApiResponse({ status: 201, description: 'Сотрудник успешно создан' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Не найдены данные в таблицах' })
    @ApiResponse({ status: 500, description: 'Ошибка с транзакцией базы данных' })
    async createStaff(@Body() body: CombinedDto): Promise<{ message: string }> {
        return await this.staffService.createStaff(body);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить информацию о сотруднике' })
    @ApiBody({
        description: 'Данные для записи', schema: {
            example: {
                firstname: 'John',
                lastname: 'Doe',
                tabelNum: 123,
                positionID: 1,
                divisionID: 1,
                staffGroupID: 1
            }
        }

    })
    @ApiResponse({ status: 200, description: 'Сотрудник успешно обновлен' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Не найдены данные в таблицах' })
    @ApiResponse({ status: 500, description: 'Ошибка с транзакцией базы данных' })
    async updateStaff(@Param('id', ValidateIdPipe) id: number, @Body() body: CombinedUpdateDto): Promise<{ message: string }> {
        return await this.staffService.updateStaff(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить сотрудника' })
    @ApiResponse({ status: 200, description: 'Сотрудник успешно удален' })
    @ApiResponse({ status: 400, description: 'Невозможно удалить себя или связанные записи' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Сотрудник не найден' })
    @ApiResponse({ status: 500, description: 'Ошибка с удалением' })
    async deleteStaff(@Param('id', ValidateIdPipe) id: number, @Req() req: { user: { id: number } }): Promise<{ message: string }> {
        if (id === req.user.id) {
            throw new BadRequestException(`You can't delete yourself`);
        }
        return await this.staffService.deleteStaff(id);
    }
}