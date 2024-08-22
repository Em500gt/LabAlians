import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength, Max } from "class-validator";

export class StaffCreateDto {
    @IsNotEmpty({ message: 'Firstname is required' })
    @IsString({ message: 'Firstname must be a string' })
    @MinLength(2, { message: 'Firstname must be at least 2 characters long' })
    @MaxLength(20, { message: 'Firstname must not exceed 20 characters' })
    firstname: string;

    @IsNotEmpty({ message: 'Lastname is required' })
    @IsString({ message: 'Lastname must be a string' })
    @MinLength(2, { message: 'Lastname must be at least 2 characters long' })
    @MaxLength(20, { message: 'Lastname must not exceed 20 characters' })
    lastname: string;

    @IsNotEmpty({ message: 'Table number is required' })
    @IsNumber({}, { message: 'Table number must be a number' })
    @Min(1, { message: 'Table number must be at least 1' })
    @Max(5000, { message: 'Table number must not exceed 5000' })
    tabelNum: number;

    @IsNotEmpty({ message: 'Position ID is required' })
    @IsNumber({}, { message: 'Position ID must be a number' })
    @Min(1, { message: 'Position ID must be at least 1' })
    positionID: number;

    @IsNotEmpty({ message: 'Division ID is required' })
    @IsNumber({}, { message: 'Division ID must be a number' })
    @Min(1, { message: 'Division ID must be at least 1' })
    divisionID: number;
}