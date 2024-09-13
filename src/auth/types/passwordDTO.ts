import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
    @IsString()
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'password is required' })
    @MinLength(8, { message: 'password must be at least 8 characters long' })
    @MaxLength(32, { message: 'password must not exceed 32 characters' })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
        message: 'password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    })
    readonly newPassword: string;
}
