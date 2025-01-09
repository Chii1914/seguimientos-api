import { HttpException, HttpStatus, Inject, Injectable, BadRequestException, NotImplementedException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentWithMotiveDto } from './dto/create-student-motive.dto';
import { Motives } from 'src/motives/entities/motive.entity';
@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Motives) private motiveRepository: Repository<Motives>
  ){}

  async notifyDocument(mail: string, message: string) {
    throw new NotImplementedException();
  }

  async create(createStudentDto: CreateStudentDto) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@alumnos.uv.cl$/;

    if (!emailRegex.test(createStudentDto.mail)){
      throw new BadRequestException('El correo debe terminar en @alumnos.uv.cl');
    }
    try {
      const student = await this.studentRepository.create(createStudentDto);
      return await this.studentRepository.save(student);
    }
    catch (error){
      console.error(error);
    }
  }

  async verify(mail: string, verified: boolean) {
    const student = await this.studentRepository.findOne({where:
      {
        mail: mail
      }
    });
    if (!mail) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    if (student){
      student.verified = verified;
      return await this.studentRepository.save(student);
    }
    else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async createStudentWithMotive(createStudentWithMotiveDto: CreateStudentWithMotiveDto) { 
    try{
      const student = await this.studentRepository.create(createStudentWithMotiveDto.student);
      createStudentWithMotiveDto.motive.mail = student.mail;
      const motive = await this.motiveRepository.create(createStudentWithMotiveDto.motive);

      await this.studentRepository.save(student);
      await this.motiveRepository.save(motive);
      return {student, motive};
    }catch(error){
      console.error(error);
    }
  }



  async findAll() {
    return await this.studentRepository.find();
  }

  async findOne(email: string) {
    return await this.studentRepository.findOne({where:
      {
        mail: email
      }
    });
  }

  async update(mail: string, updateStudentDto: UpdateStudentDto) {
    return await this.studentRepository.update(mail, updateStudentDto);
  }

  async remove(mail: string) {
    return await this.studentRepository.delete({mail});
  }


}
