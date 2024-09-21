import { AccountCreateDto, AccountUpdateDto } from "./account.dto";
import { StaffCreateDto, StaffUpdateDto } from "./staff.dto";
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CombinedDto {
    @ApiProperty({ type: StaffCreateDto })
    @ValidateNested()
    @Type(() => StaffCreateDto)
    staffCreateData: StaffCreateDto;

    @ApiProperty({ type: AccountCreateDto })
    @ValidateNested()
    @Type(() => AccountCreateDto)
    accountCreateDto: AccountCreateDto;
}

export class CombinedUpdateDto{
    @ApiProperty({ type: StaffUpdateDto })
    @ValidateNested()
    @Type(() => StaffUpdateDto)
    staffUpdateDto: StaffUpdateDto;

    @ApiProperty({ type: AccountUpdateDto })
    @ValidateNested()
    @Type(() => AccountUpdateDto)
    acountUpdateDto: AccountUpdateDto;
}