import { IsBoolean, IsDate, IsEmail, IsIn, IsInt, IsOptional, IsString } from "class-validator";

export class CreateFollowUpDto {

    @IsDate()
    timestamp: Date;

    @IsEmail()
    mail: string;

    @IsString()
    notes: string;

    @IsOptional()
    @IsBoolean()
    ajusteAcademico: boolean;

    @IsOptional()
    @IsString()
    justAjusteAcademico: string;

    @IsOptional()
    @IsBoolean()
    documentosRespaldo: boolean;

    @IsOptional()
    @IsString()
    justDocumentosRespaldo: string;

    @IsOptional()
    @IsBoolean()
    noAceptaIndicaciones: boolean;

    @IsOptional()
    @IsString()
    justNoAcpetaIndicaciones: string;

    @IsOptional()
    @IsString()
    otro: string;

    

}
