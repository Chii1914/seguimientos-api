import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentStateService } from './student-state.service';
import { CreateStudentStateDto } from './dto/create-student-state.dto';
import { UpdateStudentStateDto } from './dto/update-student-state.dto';

@Controller('student-state')
export class StudentStateController {
  constructor(private readonly studentStateService: StudentStateService) {}

  @Post()
  create(@Body() createStudentStateDto: CreateStudentStateDto) {
    return this.studentStateService.create(createStudentStateDto);
  }

  @Get()
  findAll() {
    return this.studentStateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentStateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentStateDto: UpdateStudentStateDto) {
    return this.studentStateService.update(+id, updateStudentStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentStateService.remove(+id);
  }
}
