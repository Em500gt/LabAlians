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
    @ApiOperation({ summary: 'Get a list of staff groups' })
    @ApiResponse({ status: 200, type: StaffGroupsDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Failed to retrieve protocols from database' })
    async getStaffGroups(): Promise<StaffGroups[]> {
        return await this.staffGroupsService.getStaffGroups();
    }

    @Post()
    @ApiBody({ type: StaffGroupsDto })
    @ApiOperation({ summary: 'Create a new staff group' })
    @ApiResponse({ status: 201, description: 'Staff group created successfully' })
    @ApiResponse({ status: 400, description: 'Staff group already exists' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Error creating position' })
    async createStaffGroups(@Body() body: StaffGroupsDto): Promise<{ message: string }> {
        return await this.staffGroupsService.createStaffGroups(body);
    }

    @Patch(':id')
    @ApiBody({ type: UpdateStaffGroupsDto })
    @ApiOperation({ summary: 'Update staff group' })
    @ApiResponse({ status: 200, description: 'Staff group with ID successfully updated' })
    @ApiResponse({ status: 400, description: 'Cannot update admin group' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'Staff group with ID not found' })
    async updateStaffGroups(
        @Param('id', ValidateIdPipe) id: number,
        @Body() body: UpdateStaffGroupsDto,
        @Req() req: { user: IStaff }
    ): Promise<{ message: string }> {
        console.log(req.user.id);

        if (req.user.id === 1) {
            throw new BadRequestException('Cannot update admin group');
        }
        return this.staffGroupsService.updateStaffGroups(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete staff group' })
    @ApiResponse({ status: 200, description: 'Staff group with ID successfully deleted' })
    @ApiResponse({
        status: 400,
        description: `
        Possible errors:
        - Cannot delete staff group with ID, as it is still referenced by other entities
        - Cannot delete admin group
        `
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'Staff group with ID not found' })
    @ApiResponse({ status: 500, description: 'Error deleting staff group' })
    async deleteStaffGroups(@Param('id', ValidateIdPipe) id: number, @Req() req: { user: IStaff }): Promise<{ message: string }> {
        if (req.user.id === 1) {
            throw new BadRequestException('Cannot delete admin group');
        }
        return await this.staffGroupsService.deleteStaffGroups(id);
    }
}