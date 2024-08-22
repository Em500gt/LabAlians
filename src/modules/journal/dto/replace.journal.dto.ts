import { IsNotEmpty, IsDate, IsNumber, Min, IsString, MinLength, MaxLength } from "class-validator";

export class ReplaceJournalDto {
    @IsNotEmpty({ message: 'Date is required' })
    @IsDate()
    date: Date;

    @IsNotEmpty({ message: 'Old protocol ID is required' })
    @IsNumber({}, { message: 'Old protocol ID must be a number' })
    @Min(1, { message: 'Old protocol ID must be at least 1' })
    oldProtocolID: number;

    @IsNotEmpty({ message: 'New protocol ID is required' })
    @IsNumber({}, { message: 'New protocol ID must be a number' })
    @Min(1, { message: 'New protocol ID must be at least 1' })
    newProtocolID: number;

    @IsNotEmpty({ message: 'Reason is required' })
    @IsString({ message: 'Reason must be a string' })
    @MinLength(1, { message: 'Reason must be at least 1 characters long' })
    @MaxLength(500, { message: 'Reason must not exceed 500 characters' })
    reason: string;
}