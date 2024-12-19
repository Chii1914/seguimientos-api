import { Injectable } from '@nestjs/common';
import { CreateMotiveDto } from './dto/create-motive.dto';
import { UpdateMotiveDto } from './dto/update-motive.dto';

@Injectable()
export class MotivesService {
  create(createMotiveDto: CreateMotiveDto) {
    return 'This action adds a new motive';
  }

  findAll() {
    return `This action returns all motives`;
  }

  findOne(id: number) {
    return `This action returns a #${id} motive`;
  }

  update(id: number, updateMotiveDto: UpdateMotiveDto) {
    return `This action updates a #${id} motive`;
  }

  remove(id: number) {
    return `This action removes a #${id} motive`;
  }
}
