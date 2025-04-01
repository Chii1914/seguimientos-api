import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthOutlookService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async validateOAuthLogin(thirdPartyId: string, provider: string, email: string, rol: string): Promise<string> {
    const payload = {
      sub: thirdPartyId,
      provider,
      email,
      rol
    };
    return this.jwtService.sign(payload);
  }

  async findUser(email: string) {
    const user = await this.userRepository.findOne({ where: { mail: email } });
    if (user) return { email, rol: 'admin' };

    const student = await this.studentRepository.findOne({ where: { mail: email } });
    if (student) return { email, rol: 'student' };

    throw new Error('User not found');
  }
}
