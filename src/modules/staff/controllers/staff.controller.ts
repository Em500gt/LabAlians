import { Controller, Delete, Get, Param, Patch, Post, Body, UseGuards } from "@nestjs/common";
import { StaffService } from "../services/staff.service";
import { Staff } from "../entities/staff.entity";
import { CombinedDto, CombinedUpdateDto } from "../dto/combined.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";


@Controller('staff')
@UseGuards(PermissionsGuard)
export class StaffController {
    constructor(private staffService: StaffService) { }
    
    @Get()
    @CheckPermissions('canEditRecords')
    async findStaff(): Promise<Staff[]> {
        return await this.staffService.findStaff();
    }

    @Post()
    async createStaff(@Body() body: CombinedDto): Promise<{ message: string }> {
        return await this.staffService.createStaff(body);
    }

    @Patch(':id')
    async updateStaff(@Param('id', ValidateIdPipe) id: number, @Body() body: CombinedUpdateDto): Promise<{ message: string }> {
        return await this.staffService.updateStaff(id, body);
    }

    @Delete(':id')
    async deleteStaff(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.staffService.deleteStaff(id);
    }

}