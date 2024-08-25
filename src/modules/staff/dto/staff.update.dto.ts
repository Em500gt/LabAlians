import { PartialType } from '@nestjs/mapped-types';
import { StaffCreateDto } from './staff.create.dto';

export class StaffUpdateDto extends PartialType(StaffCreateDto) {}