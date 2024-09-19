import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength, Max } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class StaffCreateDto {
    @ApiProperty({ example: 'John', description: 'Employee\'s first name' })
    @IsNotEmpty({ message: 'firstname is required' })
    @IsString({ message: 'firstname must be a string' })
    @MinLength(2, { message: 'firstname must be at least 2 characters long' })
    @MaxLength(20, { message: 'firstname must not exceed 20 characters' })
    readonly firstname: string;

    @ApiProperty({ example: 'Doe', description: 'Employee\'s last name' })
    @IsNotEmpty({ message: 'lastname is required' })
    @IsString({ message: 'lastname must be a string' })
    @MinLength(2, { message: 'lastname must be at least 2 characters long' })
    @MaxLength(20, { message: 'lastname must not exceed 20 characters' })
    readonly lastname: string;

    @ApiProperty({ example: 123, description: 'Employee\'s personal number' })
    @IsNotEmpty({ message: 'tabelNum is required' })
    @IsNumber({}, { message: 'tabelNum must be a number' })
    @Min(1, { message: 'tabelNum must be at least 1' })
    @Max(5000, { message: 'tabelNum must not exceed 5000' })
    readonly tabelNum: number;

    @ApiProperty({ example: 1, description: 'Employee\'s position ID' })
    @IsNotEmpty({ message: 'positionID is required' })
    @IsNumber({}, { message: 'positionID must be a number' })
    @Min(1, { message: 'positionID must be at least 1' })
    readonly positionID: number;

    @ApiProperty({ example: 1, description: 'Employee\'s division ID' })
    @IsNotEmpty({ message: 'divisionID is required' })
    @IsNumber({}, { message: 'divisionID must be a number' })
    @Min(1, { message: 'divisionID must be at least 1' })
    readonly divisionID: number;
}

export class StaffUpdateDto extends PartialType(StaffCreateDto) {
    @ApiProperty({ example: 'John', description: 'Employee\'s first name', required: false })
    readonly firstname?: string;

    @ApiProperty({ example: 'Doe', description: 'Employee\'s last name', required: false })
    readonly lastname?: string;

    @ApiProperty({ example: 123, description: 'Employee\'s personal number', required: false })
    readonly tabelNum?: number;

    @ApiProperty({ example: 1, description: 'Employee\'s position ID', required: false })
    readonly positionID?: number;

    @ApiProperty({ example: 1, description: 'Employee\'s division ID', required: false })
    readonly divisionID?: number;
}