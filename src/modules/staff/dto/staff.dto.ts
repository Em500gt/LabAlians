import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength, Max } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

export class StaffCreateDto {
    @IsNotEmpty({ message: 'firstname is required' })
    @IsString({ message: 'firstname must be a string' })
    @MinLength(2, { message: 'firstname must be at least 2 characters long' })
    @MaxLength(20, { message: 'firstname must not exceed 20 characters' })
    readonly firstname: string;

    @IsNotEmpty({ message: 'lastname is required' })
    @IsString({ message: 'lastname must be a string' })
    @MinLength(2, { message: 'lastname must be at least 2 characters long' })
    @MaxLength(20, { message: 'lastname must not exceed 20 characters' })
    readonly lastname: string;

    @IsNotEmpty({ message: 'tabelNum is required' })
    @IsNumber({}, { message: 'tabelNum must be a number' })
    @Min(1, { message: 'tabelNum must be at least 1' })
    @Max(5000, { message: 'tabelNum must not exceed 5000' })
    readonly tabelNum: number;

    @IsNotEmpty({ message: 'positionID is required' })
    @IsNumber({}, { message: 'positionID must be a number' })
    @Min(1, { message: 'positionID must be at least 1' })
    readonly positionID: number;

    @IsNotEmpty({ message: 'divisionID is required' })
    @IsNumber({}, { message: 'divisionID must be a number' })
    @Min(1, { message: 'divisionID must be at least 1' })
    readonly divisionID: number;
}

export class StaffUpdateDto extends PartialType(StaffCreateDto) {}