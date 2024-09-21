import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ProtocolService } from "../services/protocol.service";
import { Protocols } from "../entities/protocols.entity";
import { ProtocolCreateDto, ProtocolUpdateDto } from "../dto/protocol.dto";
import { IStaff } from "auth/types/types";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { IssueJournalDto } from "modules/journal/dto/issue.journal.dto";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Protocol')
@ApiBearerAuth()
@Controller('protocol')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class ProtocolController {
    constructor(private protocolService: ProtocolService) { }

    @Get()
    @ApiOperation({ summary: 'Get a list of all protocols by year' })
    @ApiResponse({
        status: 200, schema: {
            example: {
                id: 7,
                workDate: "2024-09-13T00:00:00.000Z",
                workObject: "Home Test",
                workSheetNum: 1300,
                isLssied: false,
                staffID: {
                    firstname: "Test",
                    lastname: "Test",
                },
                workTypeID: {
                    type: "Test"
                },
                customerID: {
                    customerName: "Test"
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 500, description: 'Failed to retrieve protocols from database' })
    @ApiQuery({ name: 'year', required: false, example: 2024, description: 'The year to filter the issue journals', schema: { default: 2024 } })
    @CheckPermissions('canViewRecords')
    async getProtocols(@Query('year') year?: number): Promise<Protocols[]> {
        return await this.protocolService.getProtocols(year);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get list of one protocol' })
    @ApiResponse({
        status: 200, schema: {
            example: {
                id: 7,
                isAccreditation: true,
                creationDate: "2024-09-14T13:23:36.126Z",
                workDate: "2024-09-13T00:00:00.000Z",
                workObject: "Home Test",
                copies: 1,
                workSheetNum: 1300,
                isLssied: false,
                note: null,
                staffID: {
                    firstname: "Test",
                    lastname: "Test",
                    tabelNum: 1300
                },
                reasonTypeID: {
                    type: "Test"
                },
                workTypeID: {
                    type: "Test"
                },
                protocolStatusID: {
                    status: "Test"
                },
                customerID: {
                    customerName: "Test",
                    phone: "+375291234567"
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'Protocol with ID not found' })
    @ApiResponse({ status: 500, description: 'Failed to retrieve protocols from database' })
    @CheckPermissions('canViewRecords')
    async getOneProtocol(@Param('id', ValidateIdPipe) id: number): Promise<Protocols> {
        return await this.protocolService.getOneProtocol(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new protocol' })
    @ApiBody({ type: ProtocolCreateDto })
    @ApiResponse({ status: 201, description: 'Protocol created successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({
        status: 404,
        description: `
        Possible errors:
        - Reason type not found
        - Work type not found
        - Protocol status not found
        - Customers not found
        `
    })
    @ApiResponse({ status: 500, description: 'Error creating protocol' })
    @CheckPermissions('canAddRecords')
    async createProtocol(@Req() req: { user: IStaff }, @Body() body: ProtocolCreateDto): Promise<{ message: string }> {
        return await this.protocolService.createProtocol(req.user.id, body);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update protocol' })
    @ApiBody({ type: ProtocolUpdateDto })
    @ApiResponse({ status: 200, description: 'Protocol updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({
        status: 404,
        description: `
        Possible errors:
        - Protocol with ID not found
        - Reason type not found
        - Work type not found
        - Protocol status not found
        - Customers not found
        `
    })
    @ApiResponse({ status: 500, description: 'Error updating protocol' })
    @CheckPermissions('canEditRecords')
    async updateProtocol(@Req() req: { user: IStaff }, @Param('id', ValidateIdPipe) id: number, @Body() body: ProtocolUpdateDto): Promise<{ message: string }> {
        const staffID = req.user.id;
        return await this.protocolService.updateProtocol(id, body, staffID);
    }

    @Post(':id/issue')
    @ApiResponse({ status: 200, description: 'The protocol was successfully issued to the customer' })
    @ApiResponse({
        status: 400,
        description: `
          Possible errors:
          - The protocol has already been issued to the customer
          - Work date is missing in the protocol
          - Work object is missing in the protocol
          - Copies is missing in the protocol
          - Work sheet is missing in the protocol
          - Reason Type is missing in the protocol
          - Work Type is missing in the protocol
          - Protocol Status is missing in the protocol
          - Customer is missing in the protocol
          - Protocol file absent in protocol
        `
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({
        status: 404,
        description: `
          Possible errors:
          - Protocol with ID not found
          - Issue method not found
        `
    })
    @ApiResponse({ status: 500, description: 'An error occurred while processing the transaction.' })
    @CheckPermissions('canAddRecords')
    async issueProtocol(@Req() req: { user: IStaff }, @Param('id', ValidateIdPipe) id: number, @Body() body: IssueJournalDto): Promise<{ message: string }> {
        const staffID = req.user.id;
        return await this.protocolService.issueProtocol(id, body, staffID);
    }
}