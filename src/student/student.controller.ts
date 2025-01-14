import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { DockService } from 'src/dock/dock.service';
import { SessionAuthGuard } from 'src/guards/session-auth.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { CustomRequest } from './types/request';
import { validate } from 'class-validator';
import { CreateMotiveDto } from 'src/motives/dto/create-motive.dto';
import { CreateStudentWithMotiveDto } from './dto/create-student-motive.dto';
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

  @Roles('admin')
  @Patch('verify')
  @UseGuards(SessionAuthGuard, RolesGuard) 
  verify(@Body() verifyStudentDto: { mail: string, verified: boolean }) {
    return this.studentService.verify(verifyStudentDto.mail, verifyStudentDto.verified);
  } 

  @Roles('admin')
  @Post('document')
  @UseGuards(SessionAuthGuard, RolesGuard)
  notifyDocument(@Body() notifyDocumentDto: { mail: string, message: string }) {
    return this.studentService.notifyDocument(notifyDocumentDto.mail, notifyDocumentDto.message);
  } 

  @Post('upload/documents')
  @UseGuards(SessionAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  uploadDocuments(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req: CustomRequest, @Body() custom: {email: string}){
    if(custom.email){
      //Caso en el que admin que sube docs desde el dashboard
      return this.dockService.uploadDocument(custom.email, files);
    }
    //Caso en el que el alumno es el que sube los documentos desde su vista
    return this.dockService.uploadDocument(req.user.email, files);
  }

  @Get('filenames/:mail')
  @UseGuards(SessionAuthGuard)
  getFileNames(@Param('mail') mail: string){
    return this.dockService.getFileNames(mail);
  } 
  
  @Roles('admin')
  @Get('download/:mail/:filename/:cat')
  @UseGuards(SessionAuthGuard, RolesGuard)
  getFile(@Param('mail') mail: string, @Param('filename') filename: string, @Param('cat') cat: string){
    return this.dockService.getFile(mail, filename, cat);
  }

  @Roles('admin')
  @Post('initialform')
  @UseGuards(SessionAuthGuard, RolesGuard)
  newStudentForm(@Body() newStudentFormDto: CreateStudentWithMotiveDto) {
    return this.studentService.createStudentWithMotive(newStudentFormDto);
  }
 
  @Roles('admin')
  @Get('generate')
  @UseGuards(SessionAuthGuard, RolesGuard)
  generateDock(){
    return this.studentService.generateDock()
  }
s

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
