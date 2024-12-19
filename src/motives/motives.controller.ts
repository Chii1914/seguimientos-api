import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MotivesService } from './motives.service';
import { CreateMotiveDto } from './dto/create-motive.dto';
import { UpdateMotiveDto } from './dto/update-motive.dto';

@Controller('motives')
export class MotivesController {
  constructor(private readonly motivesService: MotivesService) {}

  @Post()
  create(@Body() createMotiveDto: CreateMotiveDto) {
    return this.motivesService.create(createMotiveDto);
  }

  @Get()
  findAll() {
    return this.motivesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motivesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotiveDto: UpdateMotiveDto) {
    return this.motivesService.update(+id, updateMotiveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motivesService.remove(+id);
  }
}
