import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Student } from 'src/student/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    private reflector: Reflector,
    private jwtService: JwtService) {}


    async verifyToken(token: string){
      const user = await this.userRepository.findOne({ where: { sessionString: token } }) 
      || await this.studentRepository.findOne({ where: { sessionString: token } });
      return user.gtoken;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    
      if (!requiredRoles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      if (!authHeader) return false;
    
      const secret = process.env.JWT_SECRET_KEY;

      const user = await this.verifyToken(authHeader); 
      if (!user) {
        return false;
      }
    
      const decoded = this.jwtService.verify(user, { secret });
      return requiredRoles.some((role) => decoded.rol.includes(role));
    }
}