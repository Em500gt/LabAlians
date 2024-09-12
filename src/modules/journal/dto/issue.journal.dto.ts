import { IsNotEmpty, IsDate, IsNumber, Min, IsString, MinLength, MaxLength, IsOptional } from "class-validator";

export class IssueJournalDto {
    @IsNotEmpty({ message: 'Protocol ID is required' })
    @IsNumber({}, { message: 'Protocol ID must be a number' })
    @Min(1, { message: 'Protocol ID must be at least 1' })
    protocolID: number;

    @IsNotEmpty({ message: 'Date is required' })
    @IsDate()
    date: Date;

    @IsNotEmpty({ message: 'Issue method ID is required' })
    @IsNumber({}, { message: 'Issue method ID must be a number' })
    @Min(1, { message: 'Issue method ID must be at least 1' })
    issueMethodID: number;

    @IsOptional()
    @IsString()
    note?: string;
}