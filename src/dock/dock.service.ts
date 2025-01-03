import { Injectable, Logger } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Injectable()
export class DockService {
    
    private readonly logger = new Logger(DockService.name);

    getStorageConfig(studentPk: string) {
        return diskStorage({
          destination: (req, file, cb) => {
            const uploadPath = `./uploads/${studentPk}`;
            cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
            const fileName = `${Date.now()}${extname(file.originalname)}`;
            cb(null, fileName);
          },
        });
      }

}
