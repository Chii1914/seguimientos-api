

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';


@Injectable()
export class SessionAuthGuard implements CanActivate {
    constructor(
       @InjectRepository(User) private userRepository: Repository<User>,
       @InjectRepository(Student) private studentRepository: Repository<Student>, 
    ) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        return this.validateRequest(request);
    }

    private async validateRequest(request: Request): Promise<boolean> {
        try {
            const authToken = request.headers['authorization']
            if (!authToken) {
                return false;
            }
            const user = await this.userRepository.findOne({ where: { sessionString: authToken } }) 
            || await this.studentRepository.findOne({ where: { sessionString: authToken } });
            
            if (!user) {
                return false;
            }  
            if (!user) {
                return false;
            }
            
            if (!user.gtoken) {
                return false;
            }
            const decoded = jwt.verify(user.gtoken, process.env.JWT_SECRET_KEY);
            if (!decoded || !decoded.sub) {
                return false;
            }
        } catch (err) {
            console.log(err)
            return false;
        }
        return true; 
    }
}