import { IsNotEmpty, IsDate, IsNumber, Min, IsString, MinLength, MaxLength, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class IssueJournalDto {
    @ApiProperty({
        description: 'ID метода выдачи',
        example: 1,
        minimum: 1,
        type: Number,
    })
    @IsNotEmpty({ message: 'Issue method ID is required' })
    @IsNumber({}, { message: 'Issue method ID must be a number' })
    @Min(1, { message: 'Issue method ID must be at least 1' })
    issueMethodID: number;
}