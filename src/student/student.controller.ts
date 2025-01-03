import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UseGuards, Req } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { DockService } from 'src/dock/dock.service';
import { SessionAuthGuard } from 'src/guards/session-auth.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { CustomRequest } from './types/request';
@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly dockService: DockService) { }


  @Roles('student')
  @Post('identificacion')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'anverso', maxCount: 1 },
    { name: 'reverso', maxCount: 1 },
  ]))
  async uploadFilesID(
    @Param('id') id: string,
    @UploadedFiles() files: { anverso?: Express.Multer.File[], reverso?: Express.Multer.File[] },
    @Req() req: CustomRequest) {
    const fileExtensions = {
      anverso: files.anverso ? files.anverso[0].originalname.split('.').pop() : null,
      reverso: files.reverso ? files.reverso[0].originalname.split('.').pop() : null,
    };
    return await this.dockService.uploadCarnet(req.user.email, files, fileExtensions);
  }


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
