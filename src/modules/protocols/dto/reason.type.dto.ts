import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class ReasonTypeDto {
    @IsString()
    @IsNotEmpty({ message: 'Type is required' })
    @MinLength(5, { message: 'Type must be at least 5 characters long' })
    @MaxLength(32, { message: 'Type must not exceed 32 characters' })
    type: string;
}