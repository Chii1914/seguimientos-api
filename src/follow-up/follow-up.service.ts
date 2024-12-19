import { Injectable } from '@nestjs/common';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowUp } from './entities/follow-up.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowUpService {

  constructor (

    @InjectRepository(FollowUp) private followUpRepository: Repository<FollowUp>

  ){}

  async create(createFollowUpDto: CreateFollowUpDto) {
    return 'This action adds a new followUp';
  }

  async findAll() {
    return `This action returns all followUp`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} followUp`;
  }

  async update(id: number, updateFollowUpDto: UpdateFollowUpDto) {
    return `This action updates a #${id} followUp`;
  }

  async remove(id: number) {
    return `This action removes a #${id} followUp`;
  }
}
