import { IsString, IsBoolean, IsOptional, Length, IsNotEmpty } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class StaffGroupsDto {
    @IsNotEmpty({ message: 'User group is required' })
    @IsString()
    @Length(1, 50)
    staffGroup: string; // User, Admin, etc.

    @IsNotEmpty({ message: 'canAddRecords is required' })
    @IsBoolean()
    canAddRecords: boolean;

    @IsNotEmpty({ message: 'canEditRecords is required' })
    @IsBoolean()
    canEditRecords: boolean;

    @IsNotEmpty({ message: 'canDeleteRecords is required' })
    @IsBoolean()
    canDeleteRecords: boolean;

    @IsNotEmpty({ message: 'canAccessFiles is required' })
    @IsBoolean()
    canAccessFiles: boolean;
}

export class UpdateStaffGroupsDto extends OmitType(PartialType(StaffGroupsDto), ['staffGroup'] as const) {}
