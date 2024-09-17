import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ReasonTypeDto {
    @ApiProperty({
        description: 'Основание',
        example: 'Запрос клиента',
        minLength: 5,
        maxLength: 32,
    })
    @IsString()
    @IsNotEmpty({ message: 'Type is required' })
    @MinLength(5, { message: 'Type must be at least 5 characters long' })
    @MaxLength(32, { message: 'Type must not exceed 32 characters' })
    type: string;
}