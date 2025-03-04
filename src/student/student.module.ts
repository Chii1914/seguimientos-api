import { Global, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { MailerModule } from 'src/mailer/mailer.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Student]), JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '300m' },
  }),MailerModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [TypeOrmModule.forFeature([Student])],
})
export class StudentModule { }
