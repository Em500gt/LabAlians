import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Length, Max, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerCreateDto {
    @ApiProperty({
        example: 'John Doe',
        description: 'Customer name, must contain between 2 and 50 characters',
    })
    @IsNotEmpty({ message: 'Customer name is required' })
    @IsString({ message: 'Customer name must be a string' })
    @Length(2, 50, { message: 'Customer name must be between 2 and 50 characters' })
    customerName: string;

    @ApiProperty({
        example: '123 Main St',
        description: 'Customer address, must contain between 5 and 100 characters',
    })
    @IsNotEmpty({ message: 'Address is required' })
    @IsString({ message: 'Address must be a string' })
    @Length(5, 100, { message: 'Address must be between 5 and 100 characters' })
    address: string;

    @ApiProperty({
        example: '123456789',
        description: 'Customer account number, must contain between 9 and 14 characters',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'Account number must be a string' })
    @Length(9, 14, { message: 'Account number must be between 9 and 14 characters' })
    rasSch?: string;

    @ApiProperty({
        example: 123456789,
        description: 'UNP number, must be between 100000000 and 999999999',
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: 'UNP must be a number' })
    @Min(100000000, { message: 'UNP must be at least 100000000' })
    @Max(999999999, { message: 'UNP must be at most 999999999' })
    unp?: number;

    @ApiProperty({
        example: 'Bank Name',
        description: 'Bank name, must contain between 5 and 50 characters',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'Bank name must be a string' })
    @Length(5, 50, { message: 'Bank name must be between 5 and 50 characters' })
    bank?: string;

    @ApiProperty({
        example: '123 Bank St',
        description: 'Bank address, must contain between 5 and 100 characters',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'Bank address must be a string' })
    @Length(5, 100, { message: 'Bank address must be between 5 and 100 characters' })
    bankAddress?: string;

    @ApiProperty({
        example: 123456789,
        description: 'BIC number, must be between 100000000 and 999999999',
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: 'BIC must be a number' })
    @Min(100000000, { message: 'BIC must be at least 100000000' })
    @Max(999999999, { message: 'BIC must be at most 999999999' })
    bic?: number;

    @ApiProperty({
        example: 12345678,
        description: 'OKPO number, must be between 10000000 and 99999999',
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: 'OKPO must be a number' })
    @Min(10000000, { message: 'OKPO must be at least 10000000' })
    @Max(99999999, { message: 'OKPO must be at most 99999999' })
    okpo?: number;

    @ApiProperty({
        example: 'AB123456',
        description: 'Customer passport, must contain between 6 and 12 characters',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'Passport must be a string' })
    @Length(6, 12, { message: 'Passport must be between 6 and 12 characters' })
    passport?: string;

    @ApiProperty({
        example: '+375291234567',
        description: 'Customer phone number, must be a valid Belarusian number',
    })
    @IsNotEmpty({ message: 'Phone is required' })
    @IsPhoneNumber('BY', { message: 'Phone must be a valid Belarusian phone number' })
    phone: string;

    @ApiProperty({
        example: '+375171234567',
        description: 'Customer fax number, must be a valid Belarusian number',
        required: false,
    })
    @IsOptional()
    @IsPhoneNumber('BY', { message: 'Fax must be a valid Belarusian phone number' })
    fax?: string;

    @ApiProperty({
        example: 'example@domain.com',
        description: 'Customer email, must be a valid email address',
        required: false,
    })
    @IsOptional()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email?: string;

    @ApiProperty({
        example: 1,
        description: 'Customer type ID',
    })
    @IsNotEmpty({ message: 'Customer type ID is required' })
    @IsNumber({}, { message: 'Customer type ID must be an integer' })
    customerTypeID: number;
}

export class CustomerUpdateDto extends PartialType(CustomerCreateDto) {
    @ApiProperty({
        example: '123 Main St',
        description: 'Customer address, must contain between 5 and 100 characters',
        required: false,
    })
    address?: string;

    @ApiProperty({
        example: '123456789',
        description: 'Customer account number, must contain between 9 and 14 characters',
        required: false,
    })
    rasSch?: string;

    @ApiProperty({
        example: 123456789,
        description: 'UNP number, must be between 100000000 and 999999999',
        required: false,
    })
    unp?: number;

    @ApiProperty({
        example: 'Bank Name',
        description: 'Bank name, must contain between 5 and 50 characters',
        required: false,
    })
    bank?: string;

    @ApiProperty({
        example: '123 Bank St',
        description: 'Bank address, must contain between 5 and 100 characters',
        required: false,
    })
    bankAddress?: string;

    @ApiProperty({
        example: 123456789,
        description: 'BIC number, must be between 100000000 and 999999999',
        required: false,
    })
    bic?: number;

    @ApiProperty({
        example: 12345678,
        description: 'OKPO number, must be between 10000000 and 99999999',
        required: false,
    })
    okpo?: number;

    @ApiProperty({
        example: 'AB123456',
        description: 'Customer passport, must contain between 6 and 12 characters',
        required: false,
    })
    passport?: string;

    @ApiProperty({
        example: '+375291234567',
        description: 'Customer phone number, must be a valid Belarusian number',
        required: false,
    })
    phone?: string;

    @ApiProperty({
        example: '+375171234567',
        description: 'Customer fax number, must be a valid Belarusian number',
        required: false,
    })
    fax?: string;

    @ApiProperty({
        example: 'example@domain.com',
        description: 'Customer email, must be a valid email address',
        required: false,
    })
    email?: string;

    @ApiProperty({
        example: 1,
        description: 'Customer type ID',
        required: false,
    })
    customerTypeID?: number;
}