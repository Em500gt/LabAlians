import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, Length, Max, Min } from "class-validator";

export class CustomerUpdateDto {
    @IsOptional()
    @IsString({ message: 'Customer name must be a string' })
    @Length(2, 50, { message: 'Customer name must be between 2 and 50 characters' })
    customerName?: string;

    @IsOptional()
    @IsString({ message: 'Address must be a string' })
    @Length(5, 100, { message: 'Address must be between 5 and 100 characters' })
    address?: string;

    @IsOptional()
    @IsString({ message: 'RasSch must be a string' })
    @Length(9, 14, { message: 'RasSch must be between 9 and 14 characters' })
    rasSch?: string;

    @IsOptional()
    @IsNumber({}, { message: 'UNP must be a number' })
    @Min(100000000, { message: 'UNP must be at least 100000000' })
    @Max(999999999, { message: 'UNP must be at most 999999999' })
    unp?: number;

    @IsOptional()
    @IsString({ message: 'Bank must be a string' })
    @Length(5, 50, { message: 'Bank must be between 5 and 50 characters' })
    bank?: string;

    @IsOptional()
    @IsString({ message: 'Bank address must be a string' })
    @Length(5, 100, { message: 'Bank address must be between 5 and 100 characters' })
    bankAddress?: string;

    @IsOptional()
    @IsNumber({}, { message: 'BIC must be a number' })
    @Min(100000000, { message: 'BIC must be at least 100000000' })
    @Max(999999999, { message: 'BIC must be at most 999999999' })
    bic?: number;

    @IsOptional()
    @IsNumber({}, { message: 'OKPO must be a number' })
    @Min(10000000, { message: 'OKPO must be at least 10000000' })
    @Max(99999999, { message: 'OKPO must be at most 99999999' })
    okpo?: number;

    @IsOptional()
    @IsString({ message: 'Passport must be a string' })
    @Length(6, 12, { message: 'Passport must be between 6 and 12 characters' })
    passport?: string;

    @IsOptional()
    @IsPhoneNumber('BY', { message: 'Phone must be a valid Belarusian phone number' })
    phone?: string;

    @IsOptional()
    @IsPhoneNumber('BY', { message: 'Fax must be a valid Belarusian phone number' })
    fax?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Customer type ID must be an integer' })
    customerTypeID?: number;
}