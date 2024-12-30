import { Global, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { FollowUp } from 'src/follow-up/entities/follow-up.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Student,FollowUp])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [TypeOrmModule.forFeature([Student])],
})
export class StudentModule {}
