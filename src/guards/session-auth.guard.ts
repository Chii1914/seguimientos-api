import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.schema';

@Injectable()
export class SessionAuthGuard implements CanActivate {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        return this.validateRequest(request);
    }

    private async validateRequest(request: Request): Promise<boolean> {
        try {
            const authToken = request.headers['authorization']?.split(' ')[1]; 

            if (!authToken) {
                return false;
            }
            const user = await this.userModel.findOne({ SessionString: authToken });
            const token = user.Gtoken;
            
            if (!user) {
                return false;
            }
            
            if (!token) {
                return false;
            }
            const decoded = jwt.verify(user.Gtoken, process.env.JWT_SECRET_KEY);
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