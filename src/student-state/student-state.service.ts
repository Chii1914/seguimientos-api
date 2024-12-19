import { Injectable } from '@nestjs/common';
import { CreateStudentStateDto } from './dto/create-student-state.dto';
import { UpdateStudentStateDto } from './dto/update-student-state.dto';

@Injectable()
export class StudentStateService {
  create(createStudentStateDto: CreateStudentStateDto) {
    return 'This action adds a new studentState';
  }

  findAll() {
    return `This action returns all studentState`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentState`;
  }

  update(id: number, updateStudentStateDto: UpdateStudentStateDto) {
    return `This action updates a #${id} studentState`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentState`;
  }
}
