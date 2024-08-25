import { IsNumber, IsOptional, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";

export class AccountUpdateDto {
    @IsString()
    @IsOptional()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(32, { message: 'Password must not exceed 32 characters' })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
        message: 'Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    })
    readonly password?: string;

    @IsNumber()
    @IsOptional()
    @Min(1, { message: "userGroupID must be at least 1 " })
    readonly userGroupID?: number;

    @IsNumber()
    @IsOptional()
    @Min(1, { message: "staffID must be at least 1 " })
    readonly staffID?: number;
}