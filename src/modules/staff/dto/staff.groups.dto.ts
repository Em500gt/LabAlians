import { IsString, IsBoolean, IsOptional, Length, IsNotEmpty } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class StaffGroupsDto {
    @ApiProperty({
        description: 'Название группы сотрудников',
        minLength: 1,
        maxLength: 50,
        example: 'Пользователь',
    })
    @IsNotEmpty({ message: 'User group is required' })
    @IsString()
    @Length(1, 50)
    staffGroup: string;

    @ApiProperty({
        description: 'Разрешение на просмотр записей',
        example: true,
    })
    @IsNotEmpty({ message: 'canViewRecords is required' })
    @IsBoolean()
    canViewRecords: boolean;

    @ApiProperty({
        description: 'Разрешение на добавление записей',
        example: false,
    })
    @IsNotEmpty({ message: 'canAddRecords is required' })
    @IsBoolean()
    canAddRecords: boolean;

    @ApiProperty({
        description: 'Разрешение на редактирование записей',
        example: true,
    })
    @IsNotEmpty({ message: 'canEditRecords is required' })
    @IsBoolean()
    canEditRecords: boolean;

    @ApiProperty({
        description: 'Разрешение на удаление записей',
        example: false,
    })
    @IsNotEmpty({ message: 'canDeleteRecords is required' })
    @IsBoolean()
    canDeleteRecords: boolean;

    @ApiProperty({
        description: 'Разрешение на доступ к файлам',
        example: true,
    })
    @IsNotEmpty({ message: 'canAccessFiles is required' })
    @IsBoolean()
    canAccessFiles: boolean;

    @ApiProperty({
        description: 'Полный доступ ко всем функциям системы',
        example: false,
    })
    @IsNotEmpty({ message: 'fullAccess is required' })
    @IsBoolean()
    fullAccess: boolean;
}

export class UpdateStaffGroupsDto extends OmitType(PartialType(StaffGroupsDto), ['staffGroup'] as const) { }
