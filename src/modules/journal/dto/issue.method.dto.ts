import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class IssueMethodDto {
    @IsString()
    @IsNotEmpty({ message: 'Method is required' })
    @MinLength(5, { message: 'Method must be at least 5 characters long' })
    @MaxLength(32, { message: 'Method must not exceed 32 characters' })
    method: string;
}