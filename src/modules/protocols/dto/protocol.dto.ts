import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { Type } from 'class-transformer';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProtocolCreateDto {
    @ApiPropertyOptional({
        description: 'Признак аккредитации',
        example: true,
        type: Boolean,
    })
    @IsOptional()
    @IsBoolean()
    isAccreditation?: boolean;

    @ApiPropertyOptional({
        description: 'Дата создания',
        example: '2024-09-15',
        type: 'string',
        format: 'date-time',
    })
    @IsOptional()
    @IsDate()
    creationDate: Date;

    @ApiProperty({
        description: 'Дата выполнения работ',
        example: '2024-09-17T00:00:00Z',
    })
    @IsNotEmpty({ message: 'Work date is required' })
    @IsDate({ message: 'Invalid date format for work date' })
    @Type(() => Date)
    workDate: Date;

    @ApiProperty({
        description: 'Объект работ',
        example: 'Установка оборудования',
        minLength: 2,
        maxLength: 100,
    })
    @IsNotEmpty({ message: 'Work object is required' })
    @IsString({ message: 'Work object must be a string' })
    @MinLength(2, { message: 'Work object must be at least 2 characters long' })
    @MaxLength(100, { message: 'Work object must not exceed 100 characters' })
    workObject: string;

    @ApiPropertyOptional({
        description: 'Количество копий',
        example: 3,
        minimum: 0,
        maximum: 100,
        type: Number,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Copies number must be a number' })
    @Min(0, { message: 'Copies number must be at least 0' })
    @Max(100, { message: 'Copies number must not exceed 100' })
    copies?: number;

    @ApiProperty({
        description: 'Номер рабочего листа',
        example: 1234,
    })
    @IsNotEmpty({ message: 'Work sheet number is required' })
    @IsNumber({}, { message: 'Work sheet number must be a number' })
    @Min(1, { message: 'Work sheet number must be at least 0' })
    @Max(10000, { message: 'Work sheet number must not exceed 100' })
    workSheetNum?: number;

    @ApiPropertyOptional({
        description: 'Примечание',
        example: 'Дополнительная информация',
        type: String,
    })
    @IsOptional()
    @IsString({ message: 'Note must be string' })
    note?: string;

    @ApiPropertyOptional({
        description: 'ID типа причины',
        example: 2,
        minimum: 1,
        type: Number,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Reason type ID must be a number' })
    @Min(1, { message: 'Reason type ID must be at least 1' })
    reasonTypeID?: number;

    @ApiPropertyOptional({
        description: 'ID типа работы',
        example: 3,
        minimum: 1,
        type: Number,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Work type  ID must be a number' })
    @Min(1, { message: 'Work type  ID must be at least 1' })
    workTypeID?: number;

    @ApiPropertyOptional({
        description: 'ID статуса протокола',
        example: 4,
        minimum: 1,
        type: Number,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Protocol status ID must be a number' })
    @Min(1, { message: 'Protocol status ID must be at least 1' })
    protocolStatusID?: number;

    @ApiPropertyOptional({
        description: 'ID клиента',
        example: 5,
        minimum: 1,
        type: Number,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Customer ID must be a number' })
    @Min(1, { message: 'Customer ID must be at least 1' })
    customerID?: number;

    @ApiPropertyOptional({
        description: 'ID сотрудника',
        example: 6,
        type: Number,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Staff ID must be a number' })
    staffID?: number;
}

export class ProtocolUpdateDto extends OmitType(PartialType(ProtocolCreateDto), ['creationDate', 'staffID'] as const) { }