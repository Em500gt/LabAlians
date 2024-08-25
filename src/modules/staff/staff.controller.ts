import { Controller, Delete, Get, Param, Patch, Post, Body, UsePipes, ValidationPipe, ParseIntPipe } from "@nestjs/common";
import { StaffService } from "./staff.service";
import { StaffCreateDto } from "./dto/staff.create.dto";
import { AccountCreateDto } from "./dto/account.create.dto";
import { CombinedDto } from "./dto/combined.dto";
import { Staff } from "./entities/staff.entity";
import { DivisionDto } from "./dto/division.dto";
import { ValidateIdPipe } from "../../pipes/validate.id.pipe";
import { Divisions } from "./entities/divisions.entity";
import { Positions } from "./entities/positions.entity";
import { PositionDto } from "./dto/position.dto";
import { StaffGroups } from "./entities/staff.groups.entity";
import { StaffGroupsDto } from "./dto/staff.groups.dto";
import { UpdateStaffGroupsDto } from "./dto/staff.groups.update.dto";



@Controller('staff')
export class StaffController {
    constructor(private staffService: StaffService) { }

    // @Get('all')
    // async findStaff() {
    //     return await this.staffService.findUser();
    // }

    @Post('create')
    async createStaff(@Body() body: CombinedDto): Promise<Staff> {
        return await this.staffService.addUser(body);
    }

    // @Patch(':id')
    // updateStaff(@Param() id: string) {
    //     console.log(id);
    //     return `Patch`
    // }

    // @Delete(':id')
    // deleteStaff(@Param() id: string) {
    //     console.log(id);
    //     return `Delete`
    // }

    @Get('division')
    async getDivision(): Promise<Divisions[]> {
        return await this.staffService.getDivision();
    }

    @Post('division')
    async createDivision(@Body() body: DivisionDto): Promise<{ message: string }> {
        return await this.staffService.createDivision(body);
    }

    @Delete('division/:id')
    async deleteDivision(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.staffService.deleteDivision(id);
    }  

    @Get('position')
    async getPosition(): Promise<Positions[]> {
        return await this.staffService.getPosition();
    }

    @Post('position')
    async createPosition(@Body() body: PositionDto): Promise<{ message: string }> {
        return await this.staffService.createPosition(body);
    }

    @Delete('position/:id')
    async deletePosition(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.staffService.deletePosition(id);
    }

    @Get('staffgroups')
    async getStaffGroups(): Promise<StaffGroups[]> {
        return await this.staffService.getStaffGroups();
    }

    @Post('staffgroups')
    async createStaffGroups(@Body() body: StaffGroupsDto): Promise<{ message: string }> {
        console.log(body);
        
        return await this.staffService.createStaffGroups(body);
    }

    @Patch('staffgroups/:id')
    async updateStaffGroups(@Param('id', ValidateIdPipe) id: number, @Body() body: UpdateStaffGroupsDto): Promise<{message: string}> {
        return this.staffService.updateStaffGroups(id, body);
    }

    @Delete('staffgroups/:id')
    async deleteStaffGroups(@Param('id', ValidateIdPipe) id: number): Promise<{ message: string }> {
        return await this.staffService.deleteStaffGroups(id);
    }

}