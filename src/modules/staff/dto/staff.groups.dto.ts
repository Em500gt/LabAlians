import { IsString, IsBoolean, IsOptional, Length, IsNotEmpty } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class StaffGroupsDto {
    @IsNotEmpty({ message: 'User group is required' })
    @IsString()
    @Length(1, 50)
    staffGroup: string;

    @IsNotEmpty({ message: 'canViewRecords is required' })
    @IsBoolean()
    canViewRecords: boolean;

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

    @IsNotEmpty({ message: 'fullAccess is required' })
    @IsBoolean()
    fullAccess: boolean;
}

export class UpdateStaffGroupsDto extends OmitType(PartialType(StaffGroupsDto), ['staffGroup'] as const) {}
