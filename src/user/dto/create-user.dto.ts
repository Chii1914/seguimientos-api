import { IsEmail, IsEnum, isEnum, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
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
    

    @IsEnum(["Valparaíso", "Santiago", "San Felipe", "all"])
    sede
    


}
