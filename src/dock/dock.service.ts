import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class DockService {

    private readonly uploadPath = path.join(__dirname, '..', 'uploads');

    async uploadCarnet(student: string, files: { anverso?: Express.Multer.File[], reverso?: Express.Multer.File[] }, fileExtensions: { anverso?: string, reverso?: string }) {
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
}
