import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Controller('auth')
export class AuthOutlookController {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @Get('outlook')
  @UseGuards(AuthGuard('microsoft'))
  async outlookAuth(@Req() req) {}

  @Get('outlook/callback')
  @UseGuards(AuthGuard('microsoft'))
  async outlookAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const randomString = uuidv4();
      const { email, rol } = req.user;

      if (rol === 'student') {
        await this.studentRepository.update({ mail: email }, { sessionString: randomString });
        await this.studentRepository.update({ mail: email }, { gtoken: req.user.jwt });
        return res.redirect(`${process.env.FRONTEND_URL_STUDENT}?xvlf=${randomString}`);
      } else if (rol === 'admin') {
        await this.userRepository.update({ mail: email }, { sessionString: randomString });
        await this.userRepository.update({ mail: email }, { gtoken: req.user.jwt });
        return res.redirect(`${process.env.FRONTEND_URL}?xvlf=${randomString}`);
      }
    } catch (error) {
      return res.redirect(`${process.env.FRONTEND_URL}/error?message=${error.message}`);
    }
  }
}
