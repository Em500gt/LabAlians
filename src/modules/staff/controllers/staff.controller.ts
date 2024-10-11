import { Controller, Delete, Get, Param, Patch, Post, Body, UseGuards, Req, BadRequestException } from "@nestjs/common";
import { StaffService } from "../services/staff.service";
import { Staff } from "../entities/staff.entity";
import { CombinedDto, CombinedUpdateDto } from "../dto/combined.dto";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Staff')
@ApiBearerAuth()
@Controller('staff')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class StaffController {
    constructor(private staffService: StaffService) { }

    @Get()
    @ApiOperation({ summary: 'Get a list of all staff' })
    @ApiResponse({
        status: 200, schema: {
            example: {
                id: 1,
                firstname: 'test',
                lastname: 'test',
                tabelNum: 1300,
                position: 1,
                division: 1
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Failed to retrieve protocols from database' })
    async findStaff(): Promise<Staff[]> {
        return await this.staffService.findStaff();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new staff' })
    @ApiBody({
        type: CombinedDto,
        examples: {
            validRequest: {
                summary: 'Valid request example',
                description: 'A valid request to create a new staff member',
                value: {
                    firstname: "Test",
                    lastname: "Testovich",
                    tabelNum: 2,
                    positionID: 1,
                    divisionID: 1,
                    login: "Tests",
                    password: "Test*123456789",
                    staffGroupID: 1
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'Staff created successfully' })
    @ApiResponse({
        status: 400,
        description: `
        Possible errors:
        - Login already exists
        - Tabel number already exists
        `
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({
        status: 404,
        description: `
        Possible errors:
        - Position not found
        - Division not found
        - Staff group not found
        `
    })
    @ApiResponse({
        status: 500,
        description: `
        Possible errors:
        - An error occurred while processing the transaction
        - PASSWORD_SALT is not defined in the environment variables
        - PASSWORD_SALT is not a valid number
        `
    })
    async createStaff(@Body() body: CombinedDto): Promise<{ message: string }> {
        return await this.staffService.createStaff(body);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update staff information' })
    @ApiBody({
        type: CombinedUpdateDto,
        examples: {
            validRequest: {
                summary: 'Valid request example',
                description: 'A valid request to create a new staff member',
                value: {
                    firstname: "Test",
                    lastname: "Testovich",
                    tabelNum: 2,
                    positionID: 1,
                    divisionID: 1,
                    staffGroupID: 1
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'Staff updated successfully' })
    @ApiResponse({ status: 400, description: 'Tabel number already exists' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({
        status: 404,
        description: `
        Possible errors:
        - Staff with ID not found
        - Position not found
        - Division not found
        - Staff group not found
        `
    })
    @ApiResponse({ status: 500, description: 'An error occurred while processing the transaction' })
    async updateStaff(@Param('id', ValidateIdPipe) id: number, @Body() body: CombinedUpdateDto): Promise<{ message: string }> {
        return await this.staffService.updateStaff(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete staff' })
    @ApiResponse({ status: 200, description: 'Staff with ID succesfully deleted' })
    @ApiResponse({
        status: 400,
        description: `
        Possible errors:
        - Cannot delete staff with ID, as it is still referenced by other entities
        - You can't delete yourself
        `
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'Staff with ID not found' })
    @ApiResponse({ status: 500, description: 'Error deleting staff' })
    async deleteStaff(@Param('id', ValidateIdPipe) id: number, @Req() req: { user: { id: number } }): Promise<{ message: string }> {
        if (id === req.user.id) {
            throw new BadRequestException(`You can't delete yourself`);
        }
        return await this.staffService.deleteStaff(id);
    }
}