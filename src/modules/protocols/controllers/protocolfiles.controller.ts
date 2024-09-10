import { Controller, FileTypeValidator, Get, HttpException, HttpStatus, NotFoundException, Param, ParseFilePipe, Post, StreamableFile, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProtocolFilesService } from "../services/protocolfiles.service";
import { ValidateIdPipe } from "pipes/validate.id.pipe";
import { FileInterceptor } from "@nestjs/platform-express";
import { gzip as gzipCb, gunzip as gunzipCb } from 'zlib';
import { promisify } from 'util';


@Controller('protocolfiles')
export class ProtocolFilesController {
    constructor(private readonly protocolFilesService: ProtocolFilesService) { }

    @Get(':id')
    async getProtocolFile(
        @Param('id', ValidateIdPipe) id: number,
    ): Promise<StreamableFile> {
        const file = await this.protocolFilesService.findProtocolFiles(id);
        if (!file) {
            throw new NotFoundException(`File with protocol ID ${id} not found`);
        }
        const gunzipAsync = promisify(gunzipCb);
        return new StreamableFile(await gunzipAsync(file.pdfData), {
            type: 'application/pdf',
            disposition: `attachment; filename="${file.filename}"`,
        })
    }

    @Post(':protocolID/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Param('protocolID', ValidateIdPipe) protocolID: number,
        @UploadedFile(
            new ParseFilePipe({
                validators: [new FileTypeValidator({ fileType: 'pdf' })]
            })) file: Express.Multer.File) {

        const gzipAsync = promisify(gzipCb);

        if (!file) {
            throw new HttpException('File upload failed!', HttpStatus.BAD_REQUEST);
        }
        const compressedPdfData = await gzipAsync(file.buffer)
        const result = await this.protocolFilesService.createProtocolFiles(protocolID, file.originalname, compressedPdfData);
        return { message: 'File uploaded successfully', result };
    }
}