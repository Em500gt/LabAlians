import { Controller, Delete, FileTypeValidator, Get, HttpException, HttpStatus, NotFoundException, Param, ParseFilePipe, Post, Req, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProtocolFilesService } from "../services/protocolfiles.service";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { FileInterceptor } from "@nestjs/platform-express";
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags, ApiNotFoundResponse, ApiBadRequestResponse, ApiParam, ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { IStaff } from "auth/types/types";

@ApiTags('Protocol files')
@ApiBearerAuth()
@Controller('protocolfiles')
@UseGuards(PermissionsGuard)
@CheckPermissions('fullAccess')
export class ProtocolFilesController {
    constructor(private readonly protocolFilesService: ProtocolFilesService) { }

    @Get(':protocolID')
    @CheckPermissions('canViewRecords', 'canAccessFiles')
    @ApiOkResponse({ description: 'Protocol file retrieved successfully', type: StreamableFile })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'File with protocol ID not found' })
    @ApiParam({ name: 'protocolID', description: 'ID of the protocol' })
    async getProtocolFile(
        @Param('protocolID', ValidateIdPipe) protocolID: number,
    ): Promise<StreamableFile> {
        return await this.protocolFilesService.findProtocolFiles(protocolID);
    }

    @Post(':protocolID/upload')
    @CheckPermissions('canAddRecords', 'canAccessFiles')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'PDF file to upload',
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'Protocol file uploaded successfully' })
    @ApiResponse({ status: 400, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: 'File with protocol ID already exists' })
    @ApiResponse({ status: 500, description: 'Error creating protocol file' })
    @ApiBadRequestResponse({ description: 'File upload failed' })
    @ApiParam({ name: 'protocolID', description: 'ID of the protocol' })
    async uploadProtocolFile(
        @Req() req: { user: IStaff },
        @Param('protocolID', ValidateIdPipe) protocolID: number,
        @UploadedFile(
            new ParseFilePipe({
                validators: [new FileTypeValidator({ fileType: 'pdf' })]
            })) file: Express.Multer.File): Promise<{ message: string }> {
        const staffID = req.user.id;
        return await this.protocolFilesService.createProtocolFiles(protocolID, file, staffID);
    }

    @Delete(':protocolID/delete')
    @ApiResponse({ status: 200, description: 'File with protocol ID successfully deleted' })
    @ApiResponse({ status: 400, description: 'The protocol file cannot be deleted because it has already been issued' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'You do not have the required permissions' })
    @ApiResponse({ status: 404, description: `
        Possible errors:
        - File with protocol ID not found
        - Protocol with ID not found
        `
    })
    @ApiParam({ name: 'protocolID', description: 'ID of the protocol' })
    @CheckPermissions('canDeleteRecords', 'canAccessFiles')
    async deleteProtocolFile(@Req() req: { user: IStaff }, @Param('protocolID', ValidateIdPipe) protocolID: number): Promise<{ message: string }> {
        const staffID = req.user.id;
        return this.protocolFilesService.deleteProtocolFile(protocolID, staffID);
    }
}