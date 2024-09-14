import { Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { IssueMethodService } from "../services/issuemethod.service";
import { IssueMethod } from "../entities/issue.method.entity";
import { IssueMethodDto } from "../dto/issue.method.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";

@Controller()
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class IssueMethodController {
    constructor(private readonly issueMethodService: IssueMethodService) { }

    @Get()
    @CheckPermissions('canViewRecords')
    async getIssueMethod(): Promise<IssueMethod[]> {
        return await this.issueMethodService.getIssueMethod();
    }

    @Post()
    async createIssueMethod(body: IssueMethodDto): Promise<{ message: string }> {
        return this.issueMethodService.createIssueMethod(body);
    }

    @Delete(':id')
    async deleteIssueMethod(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.issueMethodService.deleteIssueMethod(id);
    }
}