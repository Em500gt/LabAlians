import { PartialType } from '@nestjs/mapped-types';
import { StaffGroupsDto } from './staff.groups.dto';

export class UpdateStaffGroupsDto extends PartialType(StaffGroupsDto) {}