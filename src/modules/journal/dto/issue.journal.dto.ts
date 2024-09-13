import { IsNotEmpty, IsDate, IsNumber, Min, IsString, MinLength, MaxLength, IsOptional } from "class-validator";

export class IssueJournalDto {
    @IsNotEmpty({ message: 'Issue method ID is required' })
    @IsNumber({}, { message: 'Issue method ID must be a number' })
    @Min(1, { message: 'Issue method ID must be at least 1' })
    issueMethodID: number;
}