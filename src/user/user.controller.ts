import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/roles/roles.decorator';
import { SessionAuthGuard } from 'src/guards/session-auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { CustomRequest } from './types/request';
import { AuthGuard } from '@nestjs/passport';
import { UserTypeGuard } from 'src/guards/user-type.guard';
import { User } from 'src/decorators/getUser.decorator';
import { StudentService } from 'src/student/student.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly studentService: StudentService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('validate')
  async ping(@User() user, @Res() res) {
    const admin = await this.userService.findOne(user.email);
    const student = await this.studentService.findOne(user.email);
    if (!admin && !student) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (admin) {
      return res.status(200).json({ message: 'Admin authenticated', user: 'admin' });
      
    }
    if (student) {
      return res.status(200).json({ message: 'Student authenticated', user: 'student' });
    }

    return res.status(500).json({ message: 'Unexpected error' });
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  @Get(':mail')
  findOne(@Param('mail') mail: string) {
    return this.userService.findOne(mail);
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  @Patch(':mail')
  update(@Param('mail') mail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(mail, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  @Delete(':mail')
  remove(@Param('mail') mail: string, @Req() req: CustomRequest) {
    return this.userService.remove(req.user.email, mail);
  }
}
