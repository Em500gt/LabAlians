import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CustomerTypeDto {
    @IsString()
    @IsNotEmpty({ message: 'Customer type is required' })
    @MinLength(5, { message: 'Customer type must be at least 5 characters long' })
    @MaxLength(32, { message: 'Customer type must not exceed 32 characters' })
    type: string;
}