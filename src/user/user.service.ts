import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    //private mailerService: MailerService,
    @InjectRepository(User) private userRepository: Repository<User>

  ) { }

  async create(createUserDto: CreateUserDto) {

    const emailRegex = /^[\w.-]+@uv\.cl$/;

    if (!emailRegex.test(createUserDto.mail)) {
      throw new Error('El correo debe terminar en @uv.cl');
    }
    
    try {
      const user = await this.userRepository.create(createUserDto)
      return await this.userRepository.save(user)
    }
    catch (e) {
      console.error(e)
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({where:
    {
      mail: email
    }
    });
  }

  async update(mail: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(mail, updateUserDto);
  }

  async remove(mail: string) {
    return await this.userRepository.softDelete({mail});
  }

}
