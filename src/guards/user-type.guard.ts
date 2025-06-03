import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  mixin,
  Type,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { StudentService } from 'src/student/student.service';
import { UserService } from 'src/user/user.service';

export function UserTypeGuard(userType: 'student' | 'admin'): Type<CanActivate> {
  @Injectable()
  class RoleGuard implements CanActivate {
    constructor(private moduleRef: ModuleRef,
      private readonly studentService: StudentService,
      private readonly userService: UserService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (!user?.email) {
        throw new UnauthorizedException('No user info from JWT.');
      }

      // Dynamically get the correct service
      let service: any;
      switch (userType) {
        case 'student':
          const student = await this.studentService.findOne(user.email);
          if (!student) {
            throw new UnauthorizedException('Student not found.');
          }
          service = this.studentService;
          break;
        case 'admin':
          const admin = await this.userService.findOne(user.email);
          if (!admin) {
            throw new UnauthorizedException('Admin not found.');
          }
          service = this.userService;
          break;
        default:
          throw new UnauthorizedException('Invalid user type.');
      }

      return true;
    }
  }

  return mixin(RoleGuard);
}
