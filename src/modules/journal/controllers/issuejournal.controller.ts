import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { IssueJournal } from "../entities/issue.journal.entity";
import { IssueJournalService } from "../services/issuejournal.service";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IssueJournalDto } from "../dto/issue.journal.dto";

@ApiTags('Issue journal')
@ApiBearerAuth()
@Controller('issuejournal')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class IssueJournalController {
    constructor(private readonly issueJournalService: IssueJournalService) { }

    @Get()
    @ApiOperation({ summary: 'Получить журнал выданных протоколов' })
    @ApiResponse({ status: 200, description: 'Успешное получение журнала', type: [IssueJournalDto] })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 403, description: 'Нету прав доступа' })
    @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
    @CheckPermissions('canViewRecords')
    async getIssueJournal(
        @Query('year') year?: number,
        @Query('issueMethodID') issueMethodID?: number
    ): Promise<IssueJournal[]> {
        return await this.issueJournalService.getIssueJournal(year, issueMethodID);
    }
}