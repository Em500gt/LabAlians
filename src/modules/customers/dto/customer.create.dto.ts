import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Length, Max, Min } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerCreateDto {
    @ApiProperty({
        example: 'John Doe',
        description: 'Имя клиента, должно содержать от 2 до 50 символов',
    })
    @IsNotEmpty({ message: 'Customer name is required' })
    @IsString({ message: 'Customer name must be a string' })
    @Length(2, 50, { message: 'Customer name must be between 2 and 50 characters' })
    customerName: string;

    @ApiProperty({
        example: '123 Main St',
        description: 'Адрес клиента, должен содержать от 5 до 100 символов',
    })
    @IsNotEmpty({ message: 'Address is required' })
    @IsString({ message: 'Address must be a string' })
    @Length(5, 100, { message: 'Address must be between 5 and 100 characters' })
    address: string;

    @ApiProperty({
        example: '123456789',
        description: 'Расчетный счет, должен содержать от 9 до 14 символов',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'RasSch must be a string' })
    @Length(9, 14, { message: 'RasSch must be between 9 and 14 characters' })
    rasSch?: string;

    @ApiProperty({
        example: 123456789,
        description: 'УНП клиента, должно быть числом от 100000000 до 999999999',
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: 'UNP must be a number' })
    @Min(100000000, { message: 'UNP must be at least 100000000' })
    @Max(999999999, { message: 'UNP must be at most 999999999' })
    unp?: number;

    @ApiProperty({
        example: 'Bank Name',
        description: 'Название банка, должно содержать от 5 до 50 символов',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'Bank must be a string' })
    @Length(5, 50, { message: 'Bank must be between 5 and 50 characters' })
    bank?: string;

    @ApiProperty({
        example: '123 Bank St',
        description: 'Адрес банка, должен содержать от 5 до 100 символов',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'Bank address must be a string' })
    @Length(5, 100, { message: 'Bank address must be between 5 and 100 characters' })
    bankAddress?: string;

    @ApiProperty({
        example: 123456789,
        description: 'БИК банка, должно быть числом от 100000000 до 999999999',
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: 'BIC must be a number' })
    @Min(100000000, { message: 'BIC must be at least 100000000' })
    @Max(999999999, { message: 'BIC must be at most 999999999' })
    bic?: number;

    @ApiProperty({
        example: 12345678,
        description: 'ОКПО клиента, должно быть числом от 10000000 до 99999999',
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: 'OKPO must be a number' })
    @Min(10000000, { message: 'OKPO must be at least 10000000' })
    @Max(99999999, { message: 'OKPO must be at most 99999999' })
    okpo?: number;

    @ApiProperty({
        example: 'AB123456',
        description: 'Паспорт клиента, должен содержать от 6 до 12 символов',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'Passport must be a string' })
    @Length(6, 12, { message: 'Passport must be between 6 and 12 characters' })
    passport?: string;

    @ApiProperty({
        example: '+375291234567',
        description: 'Телефон клиента, должен быть валидным номером Беларуси',
    })
    @IsNotEmpty({ message: 'Phone is required' })
    @IsPhoneNumber('BY', { message: 'Phone must be a valid Belarusian phone number' })
    phone: string;

    @ApiProperty({
        example: '+375171234567',
        description: 'Факс клиента, должен быть валидным номером Беларуси',
        required: false,
    })
    @IsOptional()
    @IsPhoneNumber('BY', { message: 'Fax must be a valid Belarusian phone number' })
    fax?: string;

    @ApiProperty({
        example: 'example@domain.com',
        description: 'Email клиента, должен быть валидным адресом',
        required: false,
    })
    @IsOptional()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email?: string;

    @ApiProperty({
        example: 1,
        description: 'ID типа клиента',
    })
    @IsNotEmpty({ message: 'Customer ID is required' })
    @IsNumber({}, { message: 'Customer type ID must be an integer' })
    customerTypeID: number;
}

export class CustomerUpdateDto extends PartialType(CustomerCreateDto) { }