import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class PositionDto {
    @ApiProperty({
        description: 'Должность сотрудника',
        minLength: 2,
        maxLength: 20,
        example: 'Менеджер',
    })
    @IsNotEmpty({ message: 'Position is required' })
    @IsString({ message: 'Position must be a string' })
    @MinLength(2, { message: 'Position must be at least 2 characters long' })
    @MaxLength(20, { message: 'Position must not exceed 20 characters' })
    readonly position: string;
}