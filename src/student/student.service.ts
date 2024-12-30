import { Inject, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { FollowUp } from 'src/follow-up/entities/follow-up.entity';

@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(FollowUp) private followUpRepository: Repository<FollowUp>
  ){}

  async create(createStudentDto: CreateStudentDto) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@alumnos.uv.cl$/;

    if (!emailRegex.test(createStudentDto.mail)){
      throw new Error('El correo debe terminar en @alumnos.uv.cl');
    }
    try {
      const student = await this.studentRepository.create(createStudentDto);
      return await this.studentRepository.save(student);
    }
    catch (error){
      console.error(error);
    }
  }
 async register(data: Object){
  try{
    const student = {... data['student']};
    let motives = {... data['motives']};
    const studentDto= plainToClass(CreateStudentDto, student);
    
    const errors= await validate(studentDto);
    const newStudent= await this.studentRepository.create(studentDto);
    await this.studentRepository.save(newStudent);
    
    motives={...data['motives'], mail: student.mail};
    const motivesDto = plainToClass(CreateStudentDto, motives);
    
    const newMotives= await this.studentRepository.create(motivesDto);
    await this.studentRepository.save(newMotives);
    
    if (errors.length > 0){
      return {errors}
      
    }
  }
  catch(error){
    console.error(error);
  }

 }
  
  async StudentandMotives(reasons?: string) {
    if (reasons && reasons.length > 0) {
      return await this.studentRepository
        .createQueryBuilder('student')
        .leftJoinAndSelect('student.followUps', 'followUp')
        .where('followUp.reason IN (:...reasons)', { reasons })
        .getMany();
    }
    // Si no hay motivo, devolver todos los estudiantes
    return await this.studentRepository.find({
      relations: ['followUps'],
    });
  }

  async findAll() {
    return await this.studentRepository.find();
  }

  async findOne(id : string) {
    return await this.studentRepository.findOne({where: {mail: id}});
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    return await this.studentRepository.update(id, updateStudentDto);
  }

  async remove(id: string) {
    return await this.studentRepository.softDelete(id);
  }
}
