import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/roles/roles.decorator';
import { SessionAuthGuard } from 'src/guards/session-auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { CustomRequest } from './types/request';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('admin')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles('admin')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles('admin')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Get(':mail')
  findOne(@Param('mail') mail: string) {
    return this.userService.findOne(mail);
  }

  @Roles('admin')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Patch(':mail')
  update(@Param('mail') mail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(mail, updateUserDto);
  }

  @Roles('admin')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Delete(':mail')
  remove(@Param('mail') mail: string, @Req() req: CustomRequest) {
    return this.userService.remove(req.user.email, mail);
  }
}
