import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { StaffGroupsService } from "../services/staffgroups.service";
import { StaffGroups } from "../entities/staff.groups.entity";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { StaffGroupsDto, UpdateStaffGroupsDto } from "../dto/staff.groups.dto";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { IStaff } from "auth/types/types";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('StaffGroup')
@ApiBearerAuth()
@Controller('staffgroups')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class StaffGroupsController {
    constructor(private staffGroupsService: StaffGroupsService) { }

    @Get()
    @ApiOperation({ summary: 'Получить список групп сотрудников' })
    @ApiResponse({ status: 200, description: 'Успешное получение списка групп сотрудников', type: [StaffGroupsDto] })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
    async getStaffGroups(): Promise<StaffGroups[]> {
        return await this.staffGroupsService.getStaffGroups();
    }

    @Post()
    @ApiBody({ type: StaffGroupsDto })
    @ApiOperation({ summary: 'Создать новой группы сотрудника' })
    @ApiResponse({ status: 201, description: 'Группа успешно создана' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    async createStaffGroups(@Body() body: StaffGroupsDto): Promise<{ message: string }> {
        return await this.staffGroupsService.createStaffGroups(body);
    }

    @Patch(':id')
    @ApiBody({
        schema: {
            example: {
                canViewRecords: false,
                canAddRecords: false,
                canEditRecords: false,
                canDeleteRecords: false,
                canAccessFiles: false,
                fullAccess: false
            }
    }})
    @ApiOperation({ summary: 'Обновить группу сотрудника' })
    @ApiResponse({ status: 200, description: 'Группа успешно обновлена' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации или дублирование данных' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Не найдены данные в таблицах' })
    async updateStaffGroups(
        @Param('id', ValidateIdPipe) id: number,
        @Body() body: UpdateStaffGroupsDto,
        @Req() req: { user: IStaff }
    ): Promise<{ message: string }> {
        if (req.user.id === 1) {
            throw new BadRequestException('Cannot update admin group');
        }
        return this.staffGroupsService.updateStaffGroups(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить группу' })
    @ApiResponse({ status: 200, description: 'Группа успешно удалена' })
    @ApiResponse({ status: 400, description: 'Невозможно удалить группу или связанные записи' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 404, description: 'Группа не найдена' })
    @ApiResponse({ status: 500, description: 'Ошибка с удалением' })
    async deleteStaffGroups(@Param('id', ValidateIdPipe) id: number, @Req() req: { user: IStaff }): Promise<{ message: string }> {
        if (req.user.id === 1) {
            throw new BadRequestException('Cannot delete admin group');
        }
        return await this.staffGroupsService.deleteStaffGroups(id);
    }
}