import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    mail

    @IsOptional()
    @IsString()
    gtoken

    @IsOptional()
    @IsString()
    sessionString

    @IsString()
    name

    @IsOptional()
    @IsString()
    secondName

    @IsString()
    fatherLastName

    @IsOptional()
    @IsString()
    motherLastName
}
