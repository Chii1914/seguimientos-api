import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { DockService } from 'src/dock/dock.service';

@Controller('student')
export class StudentController {
  constructor(
  private readonly studentService: StudentService,
  private readonly dockService: DockService) {}
  

  @Post('identificacion/:id')
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'anverso', maxCount: 1},
    {name: 'reverso', maxCount: 1},
  ]))
  async uploadFilesID(@Param(':id') id: string, @UploadedFiles() files: {anverso?: Express.Multer.File[], reverso?: Express.Multer.File[]}) {
    console.log(files);
    console.log(id)
    return await this.dockService.uploadCarnet(id);
  }


  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
