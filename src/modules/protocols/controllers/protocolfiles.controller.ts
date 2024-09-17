import { Controller, Delete, FileTypeValidator, Get, HttpException, HttpStatus, NotFoundException, Param, ParseFilePipe, Post, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProtocolFilesService } from "../services/protocolfiles.service";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { FileInterceptor } from "@nestjs/platform-express";
import { gzip as gzipCb, gunzip as gunzipCb } from 'zlib';
import { promisify } from 'util';
import { CheckPermissions } from "common/decorators/check-permissions.decorator";
import { PermissionsGuard } from "auth/guard/permissions.guard";
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags, ApiNotFoundResponse, ApiBadRequestResponse, ApiParam, ApiBearerAuth } from "@nestjs/swagger";

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
    @ApiNotFoundResponse({ description: 'Protocol file not found' })
    @ApiParam({ name: 'protocolID', description: 'ID of the protocol' })
    async getProtocolFile(
        @Param('protocolID', ValidateIdPipe) protocolID: number,
    ): Promise<StreamableFile> {
        const file = await this.protocolFilesService.findProtocolFiles(protocolID);
        const gunzipAsync = promisify(gunzipCb);

        return new StreamableFile(await gunzipAsync(file.pdfData), {
            type: 'application/pdf',
            disposition: `attachment; filename="${file.filename}"`,
        })
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
    @ApiOkResponse({ description: 'File uploaded successfully', schema: { example: { message: 'File uploaded' } } })
    @ApiBadRequestResponse({ description: 'File upload failed' })
    @ApiParam({ name: 'protocolID', description: 'ID of the protocol' })
    async uploadProtocolFile(
        @Param('protocolID', ValidateIdPipe) protocolID: number,
        @UploadedFile(
            new ParseFilePipe({
                validators: [new FileTypeValidator({ fileType: 'pdf' })]
            })) file: Express.Multer.File): Promise<{ message: string }> {

        const gzipAsync = promisify(gzipCb);

        if (!file) {
            throw new HttpException('File upload failed!', HttpStatus.BAD_REQUEST);
        }
        const compressedPdfData = await gzipAsync(file.buffer)
        const filename = `protocol_${protocolID}.pdf`;
        return await this.protocolFilesService.createProtocolFiles(protocolID, filename, compressedPdfData);
    }

    @Delete(':protocolID/delete')
    @ApiOkResponse({ description: 'File deleted successfully', schema: { example: { message: 'File deleted' } } })
    @ApiNotFoundResponse({ description: 'File not found' })
    @ApiParam({ name: 'protocolID', description: 'ID of the protocol' })
    @CheckPermissions('canDeleteRecords', 'canAccessFiles')
    async deleteProtocolFile(@Param('protocolID', ValidateIdPipe) protocolID: number): Promise<{ message: string }> {
        return this.protocolFilesService.deleteProtocolFile(protocolID);
    }
}