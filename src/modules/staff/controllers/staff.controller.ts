import { Controller, Delete, Get, Param, Patch, Post, Body, UsePipes, ValidationPipe, ParseIntPipe } from "@nestjs/common";
import { HashPasswordPipe } from "src/pipes/hash.password.pipe";
import { ValidateAndTransformPipe } from "src/pipes/validate.staff.pipe";
import { StaffService } from "../services/staff.service";
import { Staff } from "../entities/staff.entity";
import { CombinedDto, CombinedUpdateDto } from "../dto/combined.dto";
import { ValidateIdPipe } from "src/pipes/validate.id.pipe";


@Controller('staff')
export class StaffController {
    constructor(private staffService: StaffService) { }

    @Get()
    async findStaff(): Promise<Staff[]> {
        return await this.staffService.findStaff();
    }

    @Post()
    @UsePipes(HashPasswordPipe, ValidateAndTransformPipe)
    async createStaff(@Body() body: CombinedDto): Promise<{ message: string }> {
        return await this.staffService.createStaff(body);
    }

    @Patch(':id')
    @UsePipes(HashPasswordPipe)
    async updateStaff(@Param('id', ValidateIdPipe) id: number, @Body(ValidateAndTransformPipe) body: CombinedUpdateDto): Promise<{ message: string }> {
        return await this.staffService.updateStaff(id, body); 
    }

}