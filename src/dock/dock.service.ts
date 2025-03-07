import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class DockService {

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
}