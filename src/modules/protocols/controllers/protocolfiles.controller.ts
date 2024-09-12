import { Controller, Delete, FileTypeValidator, Get, HttpException, HttpStatus, NotFoundException, Param, ParseFilePipe, Post, StreamableFile, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProtocolFilesService } from "../services/protocolfiles.service";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { FileInterceptor } from "@nestjs/platform-express";
import { gzip as gzipCb, gunzip as gunzipCb } from 'zlib';
import { promisify } from 'util';


@Controller('protocolfiles')
export class ProtocolFilesController {
    constructor(private readonly protocolFilesService: ProtocolFilesService) { }

    @Get(':protocolID')
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
    @UseInterceptors(FileInterceptor('file'))
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
        return await this.protocolFilesService.createProtocolFiles(protocolID, file.originalname, compressedPdfData);
    }

    @Delete(':protocolID/delete')
    async deleteProtocolFile(@Param('protocolID', ValidateIdPipe) protocolID: number): Promise<{ message: string }> {
        return this.protocolFilesService.deleteProtocolFile(protocolID);
    }
}