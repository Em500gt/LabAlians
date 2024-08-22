import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class DivisionDto{
    @IsNotEmpty({ message: 'Division is required' })
    @IsString({ message: 'Division must be a string' })
    @MinLength(2, { message: 'Division must be at least 2 characters long' })
    @MaxLength(20, { message: 'Division must not exceed 20 characters' })
    division: string;
}