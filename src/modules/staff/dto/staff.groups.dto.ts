import { IsString, IsBoolean, IsOptional, Length, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class StaffGroupsDto {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the staff group',
        readOnly: true,
      })
      id: number;

    @ApiProperty({
        description: 'Name of the employee group',
        minLength: 1,
        maxLength: 50,
        example: 'User',
    })
    @IsNotEmpty({ message: 'User group is required' })
    @IsString()
    @Length(1, 50)
    staffGroup: string;

    @ApiProperty({
        description: 'Permission to view records',
        example: true,
    })
    @IsNotEmpty({ message: 'canViewRecords is required' })
    @IsBoolean()
    canViewRecords: boolean;

    @ApiProperty({
        description: 'Permission to add records',
        example: false,
    })
    @IsNotEmpty({ message: 'canAddRecords is required' })
    @IsBoolean()
    canAddRecords: boolean;

    @ApiProperty({
        description: 'Permission to edit records',
        example: true,
    })
    @IsNotEmpty({ message: 'canEditRecords is required' })
    @IsBoolean()
    canEditRecords: boolean;

    @ApiProperty({
        description: 'Permission to delete records',
        example: false,
    })
    @IsNotEmpty({ message: 'canDeleteRecords is required' })
    @IsBoolean()
    canDeleteRecords: boolean;

    @ApiProperty({
        description: 'Permission to access files',
        example: true,
    })
    @IsNotEmpty({ message: 'canAccessFiles is required' })
    @IsBoolean()
    canAccessFiles: boolean;

    @ApiProperty({
        description: 'Full access to all system features',
        example: false,
    })
    @IsNotEmpty({ message: 'fullAccess is required' })
    @IsBoolean()
    fullAccess: boolean;
}

export class UpdateStaffGroupsDto extends PartialType(StaffGroupsDto) {
    @ApiProperty({
        description: 'Permission to view records',
        example: true,
        required: false
    })
    canViewRecords?: boolean;

    @ApiProperty({
        description: 'Permission to add records',
        example: false,
        required: false
    })
    canAddRecords?: boolean;

    @ApiProperty({
        description: 'Permission to edit records',
        example: true,
        required: false
    })
    canEditRecords?: boolean;

    @ApiProperty({
        description: 'Permission to delete records',
        example: false,
        required: false
    })
    canDeleteRecords?: boolean;

    @ApiProperty({
        description: 'Permission to access files',
        example: true,
        required: false
    })
    canAccessFiles?: boolean;

    @ApiProperty({
        description: 'Full access to all system features',
        example: false,
        required: false
    })
    fullAccess?: boolean;


}
