import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class UserService {

  constructor(
    private mailerService: MailerService,
  ){}

  async create(createUserDto: CreateUserDto) {
    await this.mailerService.sendMail('nataniel.palacios@alumnos.uv.cl', 'Nataniel', 'Hola, se te envió un correo')
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
