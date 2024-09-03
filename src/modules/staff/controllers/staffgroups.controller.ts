import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { StaffGroupsService } from "../services/staffgroups.service";
import { StaffGroups } from "../entities/staff.groups.entity";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { UpdateStaffGroupsDto } from "../dto/staff.groups.update.dto";
import { StaffGroupsDto } from "../dto/staff.groups.dto";

@Controller('staffgroups')
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
    async updateStaffGroups(@Param('id', ValidateIdPipe) id: number, @Body() body: UpdateStaffGroupsDto): Promise<{ message: string }> {
        return this.staffGroupsService.updateStaffGroups(id, body);
    }

    @Delete(':id')
    async deleteStaffGroups(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.staffGroupsService.deleteStaffGroups(id);
    }
}