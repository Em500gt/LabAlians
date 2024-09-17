import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class IssueMethodDto {
    @ApiProperty({
        description: 'Метод выдачи',
        example: 'Courier',
        minLength: 5,
        maxLength: 32,
        type: String,
    })
    @IsString()
    @IsNotEmpty({ message: 'Method is required' })
    @MinLength(5, { message: 'Method must be at least 5 characters long' })
    @MaxLength(32, { message: 'Method must not exceed 32 characters' })
    method: string;
}