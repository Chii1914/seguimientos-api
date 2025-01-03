import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':mail')
  findOne(@Param('mail') mail: string) {
    return this.studentService.findOne(mail);
  }

  @Patch(':mail')
  update(@Param('mail') mail: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(mail, updateStudentDto);
  }

  @Delete(':mail')
  remove(@Param('mail') mail: string) {
    return this.studentService.remove(mail);
  }
}
