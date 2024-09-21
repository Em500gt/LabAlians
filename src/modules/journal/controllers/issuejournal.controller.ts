import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { IssueJournal } from "../entities/issue.journal.entity";
import { IssueJournalService } from "../services/issuejournal.service";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiQuery } from "@nestjs/swagger";

@ApiTags('Issue journal')
@ApiBearerAuth()
@Controller('issuejournal')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class IssueJournalController {
    constructor(private readonly issueJournalService: IssueJournalService) { }

    @Get()
    @ApiOperation({ summary: 'Get the log of issued protocols' })
    @ApiResponse({
        status: 200, schema: {
            example: {
                id: 1,
                date: '2024-09-14T13:03:53.414Z',
                issueMethodID: {
                    id: 4,
                    method: 'test'
                },
                protocolID: {
                    id: 1,
                    isAccreditation: true,
                    creationDate: '2024-09-14T13:03:33.832Z',
                    workDate: '2024-09-14T13:03:33.832Z',
                    workObject: 'Test',
                    copies: 1,
                    workSheetNum: 1,
                    isLssied: true,
                    note: null
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @ApiQuery({ name: 'year', required: false, example: 2024, description: 'The year to filter the issue journals', schema: { default: 2024 } })
    @ApiQuery({ name: 'issueMethodID', required: false, example: 1, description: 'The method ID to filter the issue journals', schema: { default: 1 } })
    @CheckPermissions('canViewRecords')
    async getIssueJournal(
        @Query('year') year?: number,
        @Query('issueMethodID') issueMethodID?: number
    ): Promise<IssueJournal[]> {
        return await this.issueJournalService.getIssueJournal(year, issueMethodID);
    }
}