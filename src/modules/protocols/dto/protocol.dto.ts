import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class ProtocolCreateDto {
    @ApiProperty({
        description: 'Accreditation flag',
        example: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    isAccreditation?: boolean;

    @ApiProperty({
        description: 'Creation date',
        example: '2024-09-15',
        type: 'string',
        format: 'date-time',
        readOnly: true,
    })
    @IsOptional()
    @IsDate()
    creationDate: Date;

    @ApiProperty({
        description: 'Work date',
        example: '2024-09-17T00:00:00Z',
    })
    @IsNotEmpty({ message: 'Work date is required' })
    @IsDate({ message: 'Invalid date format for work date' })
    @Type(() => Date)
    workDate: Date;

    @ApiProperty({
        description: 'Work object',
        example: 'Equipment installation',
        minLength: 2,
        maxLength: 100,
    })
    @IsNotEmpty({ message: 'Work object is required' })
    @IsString({ message: 'Work object must be a string' })
    @MinLength(2, { message: 'Work object must be at least 2 characters long' })
    @MaxLength(100, { message: 'Work object must not exceed 100 characters' })
    workObject: string;

    @ApiProperty({
        description: 'Number of copies',
        example: 3,
        minimum: 0,
        maximum: 100,
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Copies number must be a number' })
    @Min(0, { message: 'Copies number must be at least 0' })
    @Max(100, { message: 'Copies number must not exceed 100' })
    copies?: number;

    @ApiProperty({
        description: 'Work sheet number',
        example: 1234,
        required: false,
    })
    @IsNotEmpty({ message: 'Work sheet number is required' })
    @IsNumber({}, { message: 'Work sheet number must be a number' })
    @Min(1, { message: 'Work sheet number must be at least 1' })
    @Max(10000, { message: 'Work sheet number must not exceed 10000' })
    workSheetNum?: number;

    @ApiProperty({
        description: 'Note',
        example: 'Additional information',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'Note must be a string' })
    note?: string;

    @ApiProperty({
        description: 'Reason type ID',
        example: 2,
        minimum: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Reason type ID must be a number' })
    @Min(1, { message: 'Reason type ID must be at least 1' })
    reasonTypeID?: number;

    @ApiProperty({
        description: 'Work type ID',
        example: 3,
        minimum: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Work type ID must be a number' })
    @Min(1, { message: 'Work type ID must be at least 1' })
    workTypeID?: number;

    @ApiProperty({
        description: 'Protocol status ID',
        example: 4,
        minimum: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Protocol status ID must be a number' })
    @Min(1, { message: 'Protocol status ID must be at least 1' })
    protocolStatusID?: number;

    @ApiProperty({
        description: 'Customer ID',
        example: 5,
        minimum: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Customer ID must be a number' })
    @Min(1, { message: 'Customer ID must be at least 1' })
    customerID?: number;

    @ApiProperty({
        description: 'Staff ID',
        example: 6,
        required: false,
        readOnly: true,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Staff ID must be a number' })
    staffID?: number;
}

export class ProtocolUpdateDto extends PartialType(ProtocolCreateDto) { 
    @ApiProperty({
        description: 'Accreditation flag',
        example: true,
        required: false,
    })
    isAccreditation?: boolean;

    @ApiProperty({
        description: 'Work date',
        example: '2024-09-17T00:00:00Z',
        required: false,
    })
    workDate?: Date;

    @ApiProperty({
        description: 'Work object',
        example: 'Equipment installation',
        minLength: 2,
        maxLength: 100,
        required: false,
    })
    workObject?: string;

    @ApiProperty({
        description: 'Number of copies',
        example: 3,
        minimum: 0,
        maximum: 100,
        required: false,
    })
    copies?: number;

    @ApiProperty({
        description: 'Work sheet number',
        example: 1234,
        required: false,
    })
    workSheetNum?: number;

    @ApiProperty({
        description: 'Note',
        example: 'Additional information',
        required: false,
    })
    note?: string;

    @ApiProperty({
        description: 'Reason type ID',
        example: 2,
        minimum: 1,
        required: false,
    })
    reasonTypeID?: number;

    @ApiProperty({
        description: 'Work type ID',
        example: 3,
        minimum: 1,
        required: false,
    })
    workTypeID?: number;

    @ApiProperty({
        description: 'Protocol status ID',
        example: 4,
        minimum: 1,
        required: false,
    })
    protocolStatusID?: number;

    @ApiProperty({
        description: 'Customer ID',
        example: 5,
        minimum: 1,
        required: false,
    })
    customerID?: number;
}