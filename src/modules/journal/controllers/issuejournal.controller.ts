import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { IssueJournal } from "../entities/issue.journal.entity";
import { IssueJournalService } from "../services/issuejournal.service";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";

@Controller()
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class IssueJournalController {
    constructor(private readonly issueJournalService: IssueJournalService) { }

    @Get()
    @CheckPermissions('canViewRecords')
    async getIssueJournal(
        @Query('year') year?: number,
        @Query('issueMethodID') issueMethodID?: number
    ): Promise<IssueJournal[]> {
        return await this.issueJournalService.getIssueJournal(year, issueMethodID);
    }
}