import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Student } from 'src/student/entities/student.entity';
import { Repository } from 'typeorm';
import * as PizzZip from 'pizzip';
import * as Docxtemplater from 'docxtemplater';
@Injectable()
export class DockService {

    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>,
    ) { }

    private readonly uploadPath = path.join(__dirname, '..', 'uploads');

    uploadCarnet(student: string, files: { anverso?: Express.Multer.File[], reverso?: Express.Multer.File[] }, fileExtensions: { anverso?: string, reverso?: string }) {
        try {
            if (!fs.existsSync(this.uploadPath)) {
                fs.mkdirSync(this.uploadPath);
            }
            const studentPath = path.join(this.uploadPath, student);
            if (!fs.existsSync(studentPath)) {
                fs.mkdirSync(studentPath);
            }
            const carnetPath = path.join(studentPath, 'carnet');
            if (!fs.existsSync(carnetPath)) {
                fs.mkdirSync(carnetPath);
            }
            if (files.anverso) {
                const anversoPath = path.join(carnetPath, `anverso.${fileExtensions.anverso}`);
                fs.writeFileSync(anversoPath, files.anverso[0].buffer);
            }
            if (files.reverso) {
                const reversoPath = path.join(carnetPath, `reverso.${fileExtensions.reverso}`);
                fs.writeFileSync(reversoPath, files.reverso[0].buffer);
            }
            return { message: 'Carnet subido correctamente' };
        }
        catch (err) {
            console.error(err);
            return { message: 'Error al subir carnet' };
        }
    }

    uploadDocument(student: string, files: Array<Express.Multer.File>) {
        try {
            if (!fs.existsSync(this.uploadPath)) {
                fs.mkdirSync(this.uploadPath);
            }
            const studentPath = path.join(this.uploadPath, student);
            if (!fs.existsSync(studentPath)) {
                fs.mkdirSync(studentPath);
            }
            const documentPath = path.join(studentPath, 'documentos');
            if (!fs.existsSync(documentPath)) {
                fs.mkdirSync(documentPath);
            }
            files.forEach(file => {
                const filePath = path.join(documentPath, file.originalname);
                fs.writeFileSync(filePath, file.buffer);
            });
            return { message: 'Documentos subidos correctamente' };
        }
        catch (err) {
            console.error(err);
            return { message: 'Error al subir documentos' };
        }
    }

    getFileNames(student: string) {
        try {
            const studentPath = path.join(this.uploadPath, student);
            if (!fs.existsSync(studentPath)) {
                return { message: 'El estudiante no tiene directorio' };
            }

            const documentPath = path.join(studentPath, 'documentos');
            const carnetPath = path.join(studentPath, 'carnet');

            const documentos = fs.existsSync(documentPath) ? fs.readdirSync(documentPath) : [];
            const carnet = fs.existsSync(carnetPath) ? fs.readdirSync(carnetPath) : [];

            return { documentos, carnet };
        } catch (e) {
            console.error(e);
            return { message: 'Error al obtener nombres de archivos' };
        }
    }

    getFile(mail: string, filename: string, category: string) {
        try {
            const studentPath = path.join(this.uploadPath, mail);
            if (!fs.existsSync(studentPath)) {
                return { message: 'El estudiante no tiene directorio' };
            }
            const categoryPath = path.join(studentPath, category); // Path to the specific file
            if (!categoryPath) {
                return { message: 'El archivo no pertenece a la categoría' };
            }
            const filePath = path.join(categoryPath, filename);
            if (!filePath) {
                return { message: 'El archivo no existe' };
            }
            const file = fs.readFileSync(filePath);
            return {
                message: 'Archivo descargado correctamente',
                file: file,
                filename: filename,
            }
        }
        catch (error) {
            console.error(error);
            return { message: 'Error al obtener nombres de archivos' };
        }
    }

    deleteFile(mail: string, filename: string, category: string) {
        try {
            const studentPath = path.join(this.uploadPath, mail);
            if (!fs.existsSync(studentPath)) {
                return { message: 'El estudiante no tiene directorio' };
            }
            const categoryPath = path.join(studentPath, category);
            if (!categoryPath) {
                return { message: 'El archivo no pertenece a la categoría' };
            }
            const filePath = path.join(categoryPath, filename);
            if (!filePath) {
                return { message: 'El archivo no existe' };
            }
            fs.unlinkSync(filePath);
            return { message: 'Archivo eliminado correctamente' };

        } catch (error) {
            console.error(error);
            return { message: 'Error al eliminar archivo' };
        }
    }

    async exportOneWord(mail: string) {
        const student = await this.studentRepository.findOne({ where: { mail: mail } });
        if (!student) {
            throw new NotFoundException('Estudiante no encontrado');
        }
        // Obtener todos los seguimientos del estudiante
        const followUps = await this.studentRepository.findOne({
            where: { mail: mail },
            relations: ['followUps'],
        });
        if (!followUps) {
            throw new NotFoundException('Seguimientos no encontrados para el estudiante');
        }

        const dataFollowUps = followUps.followUps.map((item, i) => ({ ...item, index: i + 1 }));

        const templatePath = path.resolve(__dirname, './templates/followUps.docx');
        const content = fs.readFileSync(templatePath, 'binary');
        const zip = new PizzZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        try {
            doc.render({ followUps: dataFollowUps });
            
        } catch (error) {
            console.error('Template rendering failed:', error);
            throw new Error('Template processing error');
        }
        return doc.getZip().generate({ type: 'nodebuffer' });

    }
}