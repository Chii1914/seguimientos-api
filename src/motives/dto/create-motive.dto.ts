import { IsBoolean, IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateMotiveDto {

   @IsOptional()
   @IsEmail()
   mail?: string;
    
    @IsOptional()
    @IsBoolean()
    consumoSustancias?: boolean;

    @IsOptional()
    @IsString()
    justConsumoSustancias?: string;

    @IsOptional()
    @IsBoolean()
    convivencia?: boolean;

    @IsOptional()
    @IsString()
    justConvivencia?: string;

    @IsOptional()
    @IsBoolean()
    emocionalYAcademico?: boolean;

    @IsOptional()
    @IsString()
    justEmocionalYAcademico?: string;

    @IsOptional()
    @IsBoolean()
    emocional?: boolean;

    @IsOptional()
    @IsString()
    justEmocional?: string;

    @IsOptional()
    @IsBoolean()
    academico?: boolean;

    @IsOptional()
    @IsString()
    justAcademico?: string;

    @IsOptional()
    @IsBoolean()
    uvInclusiva?: boolean;

    @IsOptional()
    @IsString()
    justUvInclusiva?: string;

    @IsOptional()
    @IsBoolean()
    abuso?: boolean;

    @IsOptional()
    @IsString()
    justAbuso?: string;

    @IsOptional()
    @IsBoolean()
    economicoEmocionalAcademico?: boolean;

    @IsOptional()
    @IsString()
    justEconomicoEmocionalAcademico?: string;

    @IsOptional()
    @IsBoolean()
    economicoEmocional?: boolean;

    @IsOptional()
    @IsString()
    justEconomicoEmocional?: string;

    @IsOptional()
    @IsBoolean()
    economicoAcademico?: boolean;

    @IsOptional()
    @IsString()
    justEconomicoAcademico?: string;
}