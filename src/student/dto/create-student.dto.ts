import { IsEmail, IsOptional, IsString, IsInt, IsEnum, IsBoolean } from "class-validator";

export class CreateStudentDto {

    @IsEmail()
    mail: string;

    @IsOptional()
    @IsString()
    gtoken

    @IsOptional()
    @IsString()
    sessionString: string;

    @IsInt()
    @IsOptional()
    rut: number;

    @IsEnum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "K"])
    df: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" | "K";

    @IsEnum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
    semester: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsInt()
    phone: number;

    @IsOptional()
    @IsString()
    secondName: string;

    @IsString()
    fatherLastName: string;

    @IsOptional()
    @IsString()
    motherLastName: string;

    @IsEnum(["Valparaíso", "Santiago", "San Felipe"])
    sede: "Valparaíso" | "Santiago" | "San Felipe";

    @IsBoolean()
    verified

    @IsOptional()
    @IsString()
    remedialAction

}


