import { IsString, IsBoolean, IsOptional, Length, IsNotEmpty } from 'class-validator';

export class StaffGroupsDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    @IsOptional()
    userGroup: string; // User, Admin, etc.

    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    canAddRecords: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    canEditRecords: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    canDeleteRecords: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    canAccessFiles: boolean;
}
