import { AccountCreateDto, AccountUpdateDto } from "./account.dto";
import { StaffCreateDto, StaffUpdateDto } from "./staff.dto";
import { IntersectionType } from '@nestjs/mapped-types';

export class CombinedDto extends IntersectionType (
    StaffCreateDto,
    AccountCreateDto,
) {}

export class CombinedUpdateDto extends IntersectionType (
    StaffUpdateDto,
    AccountUpdateDto,
) {}