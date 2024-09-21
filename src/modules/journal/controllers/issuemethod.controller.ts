import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
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
    @ApiOperation({ summary: 'Get a list of issuance methods' })
    @ApiResponse({ status: 200, type: IssueMethodDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @CheckPermissions('canViewRecords')
    async getIssueMethod(): Promise<IssueMethod[]> {
        return await this.issueMethodService.getIssueMethod();
    }

    @Post()
    @ApiBody({ type: IssueMethodDto })
    @ApiOperation({ summary: 'Create a new issuance method' })
    @ApiResponse({ status: 201, description: 'Issue method created successfully' })
    @ApiResponse({ status: 400, description: 'Issue method already exists' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Error creating issue method' })
    async createIssueMethod(@Body() body: IssueMethodDto): Promise<{ message: string }> {
        return this.issueMethodService.createIssueMethod(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove issuance method' })
    @ApiResponse({ status: 200, description: 'Issue method with ID successfully deleted' })
    @ApiResponse({ status: 400, description: 'Cannot delete issue method with ID, as it is still referenced by other entities' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'Issue method with id not found' })
    @ApiResponse({ status: 500, description: 'Error deleting issue method' })
    async deleteIssueMethod(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.issueMethodService.deleteIssueMethod(id);
    }
}