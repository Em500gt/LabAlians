import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { WorkType } from "../entities/work.type.entity";
import { WorkTypeService } from "../services/worktype.service";
import { WorkTypeDto } from "../dto/work.type.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";

@Controller('worktype')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class WorkTypeController {
    constructor(private workTypeService: WorkTypeService) { }

    @Get()
    @CheckPermissions('canViewRecords')
    async getWorkType(): Promise<WorkType[]> {
        return await this.workTypeService.getWorkType();
    }

    @Post()
    async createWorkType(@Body() body: WorkTypeDto): Promise<{ message: string }> {
        return await this.workTypeService.createWorkType(body);
    }

    @Delete(':id')
    async deleteWorkType(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.workTypeService.deleteWorkType(id);
    }
}