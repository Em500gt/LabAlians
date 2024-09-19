import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class DivisionDto {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the division',
        readOnly: true,
      })
      id: number;

    @ApiProperty({
        description: 'The department in which the employee works',
        minLength: 2,
        maxLength: 20,
        example: 'Sales',
    })
    @IsNotEmpty({ message: 'Division is required' })
    @IsString({ message: 'Division must be a string' })
    @MinLength(2, { message: 'Division must be at least 2 characters long' })
    @MaxLength(20, { message: 'Division must not exceed 20 characters' })
    readonly division: string;
}