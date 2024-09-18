import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ProtocolStatusDto {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the protocol status',
        readOnly: true, 
    })
    id: number;

    @ApiProperty({
        description: 'Protocol status',
        example: 'Done',
        minLength: 2,
        maxLength: 20,
    })
    @IsNotEmpty({ message: 'Status is required' })
    @IsString({ message: 'Status must be a string' })
    @MinLength(2, { message: 'Status must be at least 2 characters long' })
    @MaxLength(20, { message: 'Status must not exceed 20 characters' })
    status: string;
}