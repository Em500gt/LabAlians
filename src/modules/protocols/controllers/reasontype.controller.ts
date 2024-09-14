import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ReasonTypeService } from "../services/reasontype.service";
import { ReasonType } from "../entities/reason.type.entity";
import { ReasonTypeDto } from "../dto/reason.type.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";

@Controller('reasontype')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class ReasonTypeController {
    constructor(private reasonTypeService: ReasonTypeService) { }

    @Get()
    @CheckPermissions('canViewRecords')
    async getReasonType(): Promise<ReasonType[]> {
        return await this.reasonTypeService.getReasonType();
    }

    @Post()
    async createReasonType(@Body() body: ReasonTypeDto): Promise<{ message: string }> {
        return await this.reasonTypeService.createReasonType(body);
    }

    @Delete(':id')
    async deleteReasonType(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return this.reasonTypeService.deleteReasonType(id);
    }
}