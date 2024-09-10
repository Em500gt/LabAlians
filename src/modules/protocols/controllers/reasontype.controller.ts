import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ReasonTypeService } from "../services/reasontype.service";
import { ReasonType } from "../entities/reason.type.entity";
import { ReasonTypeDto } from "../dto/reason.type.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";

@Controller('reasontype')
export class ReasonTypeController {
    constructor(private reasonTypeService: ReasonTypeService) { }

    @Get()
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