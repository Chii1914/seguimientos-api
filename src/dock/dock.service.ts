import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class DockService {
    
    private readonly uploadPath = path.join(__dirname, '..', 'uploads');

    uploadCarnet(student: string){

        if (!fs.existsSync(this.uploadPath)){
            fs.mkdirSync(this.uploadPath);
        }
        const studentPath = path.join(this.uploadPath, student);
        if (!fs.existsSync(studentPath)){
            fs.mkdirSync(studentPath);
        }
        const carnetPath = path.join(studentPath, 'carnet');
        if (!fs.existsSync(carnetPath)){
            fs.mkdirSync(carnetPath);
        }
        return carnetPath;

    }
}
