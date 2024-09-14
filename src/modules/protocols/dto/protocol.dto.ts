import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { Type } from 'class-transformer';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class ProtocolCreateDto {
    @IsOptional()
    @IsBoolean()
    isAccreditation?: boolean;

    @IsOptional()
    @IsDate()
    creationDate: Date;

    @IsNotEmpty({ message: 'Work date is required' })
    @IsDate({ message: 'Invalid date format for work date' })
    @Type(() => Date)
    workDate: Date;

    @IsNotEmpty({ message: 'Work object is required' })
    @IsString({ message: 'Work object must be a string' })
    @MinLength(2, { message: 'Work object must be at least 2 characters long' })
    @MaxLength(100, { message: 'Work object must not exceed 100 characters' })
    workObject: string;

    @IsOptional()
    @IsNumber({}, { message: 'Copies number must be a number' })
    @Min(0, { message: 'Copies number must be at least 0' })
    @Max(100, { message: 'Copies number must not exceed 100' })
    copies?: number;

    @IsNotEmpty({ message: 'Work sheet number is required' })
    @IsNumber({}, { message: 'Work sheet number must be a number' })
    @Min(1, { message: 'Work sheet number must be at least 0' })
    @Max(10000, { message: 'Work sheet number must not exceed 100' })
    workSheetNum?: number;

    @IsOptional()
    @IsString({ message: 'Note must be string' })
    note?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Reason type ID must be a number' })
    @Min(1, { message: 'Reason type ID must be at least 1' })
    reasonTypeID?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Work type  ID must be a number' })
    @Min(1, { message: 'Work type  ID must be at least 1' })
    workTypeID?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Protocol status ID must be a number' })
    @Min(1, { message: 'Protocol status ID must be at least 1' })
    protocolStatusID?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Customer ID must be a number' })
    @Min(1, { message: 'Customer ID must be at least 1' })
    customerID?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Staff ID must be a number' })
    staffID?: number;
}

export class ProtocolUpdateDto extends OmitType(PartialType(ProtocolCreateDto), ['creationDate', 'staffID'] as const) {}