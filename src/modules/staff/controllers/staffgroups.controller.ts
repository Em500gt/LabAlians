import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { StaffGroupsService } from "../services/staffgroups.service";
import { StaffGroups } from "../entities/staff.groups.entity";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { StaffGroupsDto, UpdateStaffGroupsDto } from "../dto/staff.groups.dto";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { IStaff } from "auth/types/types";

@Controller('staffgroups')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class StaffGroupsController {
    constructor(private staffGroupsService: StaffGroupsService) { }

    @Get()
    async getStaffGroups(): Promise<StaffGroups[]> {
        return await this.staffGroupsService.getStaffGroups();
    }

    @Post()
    async createStaffGroups(@Body() body: StaffGroupsDto): Promise<{ message: string }> {
        return await this.staffGroupsService.createStaffGroups(body);
    }

    @Patch(':id')
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
    async deleteStaffGroups(@Param('id', ValidateIdPipe) id: number, @Req() req: { user: IStaff }): Promise<{ message: string }> {
        if (req.user.id === 1) {
            throw new BadRequestException('Cannot delete admin group');
        }
        return await this.staffGroupsService.deleteStaffGroups(id);
    }
}