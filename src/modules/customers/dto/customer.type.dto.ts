import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerTypeDto {
    @ApiProperty({
        example: 'Individual',
        description: 'Тип клиента, должен содержать от 5 до 32 символов',
    })
    @IsString()
    @IsNotEmpty({ message: 'Customer type is required' })
    @MinLength(5, { message: 'Customer type must be at least 5 characters long' })
    @MaxLength(32, { message: 'Customer type must not exceed 32 characters' })
    type: string;
}