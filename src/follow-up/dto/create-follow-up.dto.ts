import { IsBoolean, IsDate, Matches, IsEmail, IsOptional, IsString } from "class-validator";
import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Transform } from 'class-transformer';


export class CreateFollowUpDto {
    @IsString({ message: 'El timestamp debe ser una cadena de texto' })
    timestamp: string;
    
    @IsEmail()
    mail: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsBoolean()
    asistentaSocial: boolean;

    @IsOptional()
    @IsString()
    justAsistentaSocial: string;

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
    justNoAceptaIndicaciones: string;

    @IsOptional()
    @IsString()
    otro: string;
}
