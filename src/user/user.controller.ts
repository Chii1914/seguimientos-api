import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':mail')
  findOne(@Param('mail') mail: string) {
    return this.userService.findOne(mail);
  }

  @Patch(':mail')
  update(@Param('mail') mail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(mail, updateUserDto);
  }

  @Delete(':mail')
  remove(@Param('mail') mail: string) {
    return this.userService.remove(mail);
  }
}
