import { Controller, Get, Post, Res, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { DockService } from 'src/dock/dock.service';
import { CustomRequest } from './types/request';
import { CreateStudentWithMotiveDto } from './dto/create-student-motive.dto';
import { UserTypeGuard } from 'src/guards/user-type.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly dockService: DockService) { }


  @Post('identificacion')
  @UseGuards(AuthGuard('jwt'), UserTypeGuard('student'))
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'anverso', maxCount: 1 },
    { name: 'reverso', maxCount: 1 },
  ]))
  uploadFilesID(
    @Param('id') id: string,
    @UploadedFiles() files: { anverso?: Express.Multer.File[], reverso?: Express.Multer.File[] },
    @Req() req: CustomRequest) {
    const fileExtensions = {
      anverso: files.anverso ? files.anverso[0].originalname.split('.').pop() : null,
      reverso: files.reverso ? files.reverso[0].originalname.split('.').pop() : null,
    };
    return this.dockService.uploadCarnet(req.user.email, files, fileExtensions);
  }

  @Patch('verify')
  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  verify(@Body() verifyStudentDto: { mail: string, verified: boolean }) {
    return this.studentService.verify(verifyStudentDto.mail, verifyStudentDto.verified);
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  @Post('document')
  notifyDocument(@Body() notifyDocumentDto: { mail: string, message: string }, @Req() req: CustomRequest) {
    return this.studentService.notifyDocument(req.user.email, notifyDocumentDto.mail, notifyDocumentDto.message);
  }

  @Post('upload/documents')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(AnyFilesInterceptor())
  uploadDocuments(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req: CustomRequest, @Body() custom: { email: string }) {
    if (custom.email) {
      //Caso en el que admin que sube docs desde el dashboard
      return this.dockService.uploadDocument(custom.email, files);
    }
    //Caso en el que el alumno es el que sube los documentos desde su vista
    return this.dockService.uploadDocument(req.user.email, files);
  }

  @Get('filenames/:mail')
  @UseGuards(AuthGuard('jwt'))
  getFileNames(@Param('mail') mail: string) {
    return this.dockService.getFileNames(mail);
  }

  @Get('download/:mail/:filename/:cat')
  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  getFile(@Param('mail') mail: string, @Param('filename') filename: string, @Param('cat') cat: string) {
    return this.dockService.getFile(mail, filename, cat);
  }

  @Post('initialform')
  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  newStudentForm(@Body() newStudentFormDto: CreateStudentWithMotiveDto) {
    return this.studentService.createStudentWithMotive(newStudentFormDto);
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  @Get('motives')
  findWithMotives() {
    return this.studentService.findStudentsWithMotive();
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  @Patch('motives/:mail')
  updateWithMotives(@Param('mail') mail: string, @Body() data: any) {
    return this.studentService.updateWithMotives(data);
  }


  @Get(':mail')
  findOne(@Param('mail') mail: string) {
    return this.studentService.findOne(mail);
  }

  @Patch(':mail')
  update(@Param('mail') mail: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(mail, updateStudentDto);
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  @Delete(':mail')
  remove(@Param('mail') mail: string) {
    return this.studentService.remove(mail);
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  @Delete('delete/:mail/:filename/:cat')
  removeFile(@Param('mail') mail: string, @Param('filename') filename: string, @Param('cat') cat: string) {
    return this.dockService.deleteFile(mail, filename, cat);
  }

  //@UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))

  @Get('export-word/:mail')
  async exportOneWord(@Param('mail') mail: string, @Res({ passthrough: false }) res: Response) {
    const buffer = await this.dockService.exportOneWord(mail);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename=seguimientos_${mail}.docx`);
    res.setHeader('Content-Length', buffer.length);

    res.end(buffer);

  }
}
