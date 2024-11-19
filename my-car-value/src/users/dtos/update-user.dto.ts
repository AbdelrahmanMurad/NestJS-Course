import { IsEmail, IsOptional, IsString } from "class-validator"

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    password: string
}

// @IsOptional(): If you want to provide/not provide email/password => its optional.