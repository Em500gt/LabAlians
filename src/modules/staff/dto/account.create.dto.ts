import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";

export class AccountCreateDto {
    @IsString()
    @IsNotEmpty({ message: 'Login is required' })
    @MinLength(4, { message: 'Login must be at least 4 characters long' })
    @MaxLength(20, { message: 'Login must not exceed 20 characters' })
    login: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(32, { message: 'Password must not exceed 32 characters' })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
        message: 'Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      })
    password: string;

    @IsNumber()
    @IsNotEmpty({message: 'userGroupID is required'})
    @Min(1, {message: "userGroupID must be at least 1 "})
    userGroupID: number;

    @IsNumber()
    @IsNotEmpty({message: 'staffID is required'})
    @Min(1, {message: "staffID must be at least 1 "})
    staffID: number;
}