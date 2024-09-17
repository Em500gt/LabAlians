import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ProtocolStatusDto {
    @ApiProperty({
        description: 'Статус протокола',
        example: 'Ожидание',
        minLength: 2,
        maxLength: 20,
    })
    @IsNotEmpty({ message: 'Status is required' })
    @IsString({ message: 'Status must be a string' })
    @MinLength(2, { message: 'Status must be at least 2 characters long' })
    @MaxLength(20, { message: 'Status must not exceed 20 characters' })
    status: string;
}