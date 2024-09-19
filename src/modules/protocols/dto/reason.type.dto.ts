import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ReasonTypeDto {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the reason type',
        readOnly: true, 
    })
    id: number;

    @ApiProperty({
        description: 'Reason',
        example: 'Customer request',
        minLength: 5,
        maxLength: 32,
    })
    @IsString()
    @IsNotEmpty({ message: 'Type is required' })
    @MinLength(5, { message: 'Type must be at least 5 characters long' })
    @MaxLength(32, { message: 'Type must not exceed 32 characters' })
    type: string;
}