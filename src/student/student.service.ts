import { HttpException, HttpStatus, Inject, Injectable, BadRequestException, NotImplementedException, NotAcceptableException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentWithMotiveDto } from './dto/create-student-motive.dto';
import { Motives } from 'src/motives/entities/motive.entity';
import { MailerService } from 'src/mailer/mailer.service';
import solicitude from './types/mailDocuments';
@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Motives) private motiveRepository: Repository<Motives>,
    private readonly mailerService: MailerService
  ) { }

  async notifyDocument(author: string,mail: string, message: string) {
    try {
      const student = await this.studentRepository.findOneOrFail({ where: { mail } });
      const name = student.name.split(' ')[0] + ' ' + student.fatherLastName.split(' ')[0];
      await this.mailerService.sendMail(mail, 'Solicitud de documentos', '', `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solicitud de Documentos</title>
  <style>
    body {
      font-family: 'Swis721BT', sans-serif;
      background-color: #f5f5f5;
      color: #003c58;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      color: #003c58;
      font-size: 24px;
      margin: 0;
    }
    .content {
      font-size: 16px;
      line-height: 1.6;
    }
    .content p {
      margin: 0 0 15px;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      font-size: 12px;
      color: #003c58;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #003c58;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .button:hover {
      background-color: #00243f;
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="header">
      <h1>Solicitud de Documentos</h1>
    </div>
    <div class="content">
      <p>Estimado/a <strong>${name}</strong>,</p>
      <p>Se le ha solicitado el siguiente documento para completar su trámite:</p>
      <strong>${message}</strong>
      <p>Por favor, suba estos documentos a la plataforma a la brevedad.</p>
      <a href="seg.administracionpublica-uv.cl" class="button">Haga click aquí para ir a la plataforma</a>
    </div>
    <div class="footer">
      <p>Gracias por su atención, no responda a este correo, si tiene alguna duda dirígase a su entrevistador ${author}.</p>
    </div>
  </div>

</body>
</html>
;`);
      return { message: 'Correo enviado' };
    } catch
    (error) {
      console.log(error)
      throw new NotAcceptableException('No se pudo enviar el correo');
    }

  }

  async create(createStudentDto: CreateStudentDto) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@alumnos.uv.cl$/;

    if (!emailRegex.test(createStudentDto.mail)) {
      throw new BadRequestException('El correo debe terminar en @alumnos.uv.cl');
    }
    try {
      const student = await this.studentRepository.create(createStudentDto);
      return await this.studentRepository.save(student);
    }
    catch (error) {
      console.error(error);
    }
  }

  async verify(mail: string, verified: boolean) {
    const student = await this.studentRepository.findOne({
      where:
      {
        mail: mail
      }
    });
    if (!mail) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    if (student) {
      student.verified = verified;
      return await this.studentRepository.save(student);
    }
    else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async createStudentWithMotive(createStudentWithMotiveDto: CreateStudentWithMotiveDto) {
    try {
      const student = await this.studentRepository.create(createStudentWithMotiveDto.student);
      createStudentWithMotiveDto.motive.mail = student.mail;
      const motive = await this.motiveRepository.create(createStudentWithMotiveDto.motive);

      await this.studentRepository.save(student);
      await this.motiveRepository.save(motive);
      return { student, motive };
    } catch (error) {
      console.error(error);
    }
  }

  async findAll() {
    return await this.studentRepository.find();
  }

  async findOne(email: string) {
    return await this.studentRepository.findOne({
      where:
      {
        mail: email
      }
    });
  }

  async update(mail: string, updateStudentDto: UpdateStudentDto) {
    return await this.studentRepository.update(mail, updateStudentDto);
  }

  async remove(mail: string) {
    return await this.studentRepository.delete({ mail });
  }


}
