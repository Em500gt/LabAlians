import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class ProtocolCreateDto { /// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    @IsNotEmpty()
    @IsBoolean()
    isAccreditation: boolean;

    @IsNotEmpty()
    @IsDate()
    creationDate: Date;

    @IsNotEmpty({ message: 'Work date is required' })
    @IsString({ message: 'Work date must be a string' })
    @MinLength(2, { message: 'Work date must be at least 2 characters long' })
    @MaxLength(20, { message: 'Work date must not exceed 20 characters' })
    workDate: string;

    @IsNotEmpty({ message: 'Work object is required' })
    @IsString({ message: 'Work object must be a string' })
    @MinLength(2, { message: 'Work object must be at least 2 characters long' })
    @MaxLength(100, { message: 'Work object must not exceed 100 characters' })
    workObject: string;

    @IsNotEmpty({ message: 'Copies number is required' })
    @IsNumber({}, { message: 'Copies number must be a number' })
    @Min(0, { message: 'Copies number must be at least 0' })
    @Max(100, { message: 'Copies number must not exceed 100' })
    copies: number;

    @IsNotEmpty({ message: 'Work sheet number is required' })
    @IsNumber({}, { message: 'Work sheet number must be a number' })
    @Min(1, { message: 'Work sheet number must be at least 0' })
    @Max(10000, { message: 'Work sheet number must not exceed 100' })
    workSheetNum: number;

    @IsNotEmpty({ message: 'Is lssied number is required' })
    @IsNumber({}, { message: 'Is lssied number must be a number' })
    @Min(0, { message: 'Is lssied number must be at least 0' })
    @Max(100, { message: 'Is lssied number must not exceed 100' })
    isLssied: number; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    @IsOptional()
    @IsString({message: 'Note must be string'})
    note?: string;

    @IsNotEmpty({ message: 'Reason type ID is required' })
    @IsNumber({}, { message: 'Reason type ID must be a number' })
    @Min(1, { message: 'Reason type ID must be at least 1' })
    reasonTypeID: number;

    @IsNotEmpty({ message: 'Work type ID is required' })
    @IsNumber({}, { message: 'Work type  ID must be a number' })
    @Min(1, { message: 'Work type  ID must be at least 1' })
    workTypeID: number;

    @IsNotEmpty({ message: 'Protocol status ID is required' })
    @IsNumber({}, { message: 'Protocol status ID must be a number' })
    @Min(1, { message: 'Protocol status ID must be at least 1' })
    protocolStatusID: number;

    @IsNotEmpty({ message: 'Replace journal ID is required' })
    @IsNumber({}, { message: 'Replace journal ID must be a number' })
    @Min(1, { message: 'Replace journal ID must be at least 1' })
    replaceJournalID: number;

    @IsNotEmpty({ message: 'Issue journal ID is required' })
    @IsNumber({}, { message: 'Issue journal ID must be a number' })
    @Min(1, { message: 'Issue journal ID must be at least 1' })
    issueJournalID: number;

    @IsNotEmpty({ message: 'Customer ID is required' })
    @IsNumber({}, { message: 'Customer ID must be a number' })
    @Min(1, { message: 'Customer ID must be at least 1' })
    customerID: number;

    @IsNotEmpty({ message: 'Staff ID is required' })
    @IsNumber({}, { message: 'Staff ID must be a number' })
    @Min(1, { message: 'Staff ID must be at least 1' })
    staffID: number;
}