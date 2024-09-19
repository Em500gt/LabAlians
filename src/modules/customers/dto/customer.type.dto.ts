import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerTypeDto {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the customer type',
        readOnly: true, 
    })
    id: number;

    @ApiProperty({
        example: 'Individual',
        description: 'Client type, must be between 5 and 32 characters',
    })
    @IsString()
    @IsNotEmpty({ message: 'Customer type is required' })
    @MinLength(5, { message: 'Customer type must be at least 5 characters long' })
    @MaxLength(32, { message: 'Customer type must not exceed 32 characters' })
    type: string;
}