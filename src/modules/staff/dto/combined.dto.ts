import { AccountCreateDto } from "./account.create.dto";
import { StaffCreateDto } from "./staff.create.dto";
import { IntersectionType } from '@nestjs/mapped-types';
import { StaffUpdateDto } from "./staff.update.dto";
import { AccountUpdateDto } from "./account.update.dto";

export class CombinedDto extends IntersectionType(
    StaffCreateDto,
    AccountCreateDto,
) { }

export class CombinedUpdateDto extends IntersectionType(
        StaffUpdateDto,
        AccountUpdateDto
) { }