import { AccountCreateDto } from "./account.create.dto";
import { StaffCreateDto } from "./staff.create.dto";
import { IntersectionType } from '@nestjs/mapped-types';

export class CombinedDto extends IntersectionType (
    StaffCreateDto,
    AccountCreateDto,
) {}