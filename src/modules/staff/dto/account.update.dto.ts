import { PartialType, OmitType } from '@nestjs/mapped-types';
import { AccountCreateDto } from './account.create.dto';

export class AccountUpdateDto extends OmitType(PartialType(AccountCreateDto), ['login', 'password'] as const) {}