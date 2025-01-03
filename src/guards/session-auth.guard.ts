import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Student } from 'src/student/entities/student.entity';
import { Repository } from 'typeorm';

// Define the custom request interface
interface CustomRequest extends Request {
  user?: {
    email: string;
  };
}

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    return this.validateRequest(request);
  }

  private async validateRequest(request: CustomRequest): Promise<boolean> {
    try {
      const authToken = request.headers['authorization'];
      if (!authToken) {
        return false;
      }

      // Look up the user or student based on the session token
      const user =
        (await this.userRepository.findOne({ where: { sessionString: authToken } })) ||
        (await this.studentRepository.findOne({ where: { sessionString: authToken } }));

      if (!user || !user.gtoken) {
        return false;
      }

      // Decode the JWT token
      const decoded = jwt.verify(user.gtoken, process.env.JWT_SECRET_KEY) as jwt.JwtPayload;

      if (!decoded || !decoded.email) {
        return false;
      }

      // Attach the email to the custom `user` property on the request
      request.user = { email: decoded.email };
      return true;
    } catch (err) {
      console.error('Session validation error:', err);
      return false;
    }
  }
}
