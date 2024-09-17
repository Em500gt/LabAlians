import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from "@nestjs/swagger";

export class AccountCreateDto {
  @ApiProperty({ example: 'johndoe', description: 'Логин сотрудника' })
  @IsString()
  @IsNotEmpty({ message: 'login is required' })
  @MinLength(4, { message: 'login must be at least 4 characters long' })
  @MaxLength(20, { message: 'login must not exceed 20 characters' })
  readonly login: string;

  @ApiProperty({ example: 'P@ssw0rd', description: 'Пароль сотрудника' })
  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @MaxLength(32, { message: 'password must not exceed 32 characters' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message: 'password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  readonly password: string;

  @ApiProperty({ example: 1, description: 'ID группы сотрудников' })
  @IsNumber()
  @IsNotEmpty({ message: 'staffGroupID is required' })
  @Min(1, { message: "staffGroupID must be at least 1 " })
  readonly staffGroupID: number;
}

export class AccountUpdateDto extends OmitType(PartialType(AccountCreateDto), ['login', 'password'] as const) { }