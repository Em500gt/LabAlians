import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber, Min } from "class-validator";

export class ProtocolFileDto {

    @IsNotEmpty({ message: 'Filename is required' })
    @IsString({ message: 'Filename must be a string' })
    @MinLength(1, { message: 'Filename must be at least 1 characters long' })
    @MaxLength(50, { message: 'Filename must not exceed 50 characters' })
    filename: string;

    @IsNotEmpty({ message: 'pdfData is required' }) ///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    pdfData: Buffer;

    @IsNotEmpty({ message: 'Protocol ID is required' })
    @IsNumber({}, { message: 'Protocol ID must be a number' })
    @Min(1, { message: 'Protocol ID must be at least 1' })
    protocolID: number;
}