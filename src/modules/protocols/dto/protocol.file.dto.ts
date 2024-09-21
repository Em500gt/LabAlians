import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ProtocolFileDto {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the protocol file',
        readOnly: true,
    })
    id: number;

    @ApiProperty({
        description: 'File name',
        example: 'report.pdf',
        minLength: 1,
        maxLength: 50,
        type: String,
    })
    @IsNotEmpty({ message: 'Filename is required' })
    @IsString({ message: 'Filename must be a string' })
    @MinLength(1, { message: 'Filename must be at least 1 characters long' })
    @MaxLength(50, { message: 'Filename must not exceed 50 characters' })
    filename: string;

    @ApiProperty({
        description: 'PDF file data',
        example: '<Buffer>',
        type: 'string',
        format: 'binary',
    })
    @IsNotEmpty({ message: 'pdfData is required' })
    pdfData: Buffer;

    @ApiProperty({
        description: 'Protocol id',
        example: 1,
        minimum: 1,
        type: Number,
    })
    @IsNotEmpty({ message: 'Protocol ID is required' })
    @IsNumber({}, { message: 'Protocol ID must be a number' })
    @Min(1, { message: 'Protocol ID must be at least 1' })
    protocolID: number;
}