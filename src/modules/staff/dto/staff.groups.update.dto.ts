import { OmitType, PartialType } from '@nestjs/mapped-types';
import { StaffGroupsDto } from './staff.groups.dto';

export class UpdateStaffGroupsDto extends OmitType(PartialType(StaffGroupsDto), ['userGroup'] as const) {}