import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { WorkType } from "../entities/work.type.entity";
import { WorkTypeService } from "../services/worktype.service";
import { WorkTypeDto } from "../dto/work.type.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";

@Controller('worktype')
export class WorkTypeController {
    constructor(private workTypeService: WorkTypeService) { }

    @Get()
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