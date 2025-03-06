import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowUp } from './entities/follow-up.entity';
import { In, Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class FollowUpService {

  constructor(
    @InjectRepository(FollowUp) private followUpRepository: Repository<FollowUp>,
    @InjectRepository(Student) private studentRepository: Repository<Student>
  ) { }

  async create(followup: any) {
    const followUpDto = plainToInstance(CreateFollowUpDto, followup);
    const errors = await validate(followUpDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    followUpDto.timestamp = new Date(
      followUpDto.timestamp.split(' ')[0].split('-').reverse().join('-') + 'T' + followUpDto.timestamp.split(' ')[1]
    ).toISOString();
    await this.followUpRepository.save(followUpDto);
    return followUpDto;

  }

  findAll() {
    return `This action returns all followUp`;
  }

  findOne(mail: string) {
    return this.followUpRepository.find({ where: { mail: mail } });
  }

  update(id: number, updateFollowUpDto: UpdateFollowUpDto) {
    return `This action updates a #${id} followUp`;
  }

  remove(id: number) {
    return `This action removes a #${id} followUp`;
  }
}
