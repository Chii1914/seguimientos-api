import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FollowUpService } from './follow-up.service';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';
import { Roles } from 'src/common/roles/roles.decorator';
import { SessionAuthGuard } from 'src/guards/session-auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { UserTypeGuard } from 'src/guards/user-type.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('follow-up')
export class FollowUpController {
  constructor(private readonly followUpService: FollowUpService) {}

  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  @Post(':mail')
  create(@Param('mail') mail: string, @Body() followUpData:any) {
    const followUp = followUpData.follow_up;
    followUp.mail = mail;
    return this.followUpService.create(followUp);
  }

  @Get()
  findAll() {
    return this.followUpService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard('admin'))
  @Get(':mail')
  findOne(@Param('mail') mail: string) {
    return this.followUpService.findOne(mail);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFollowUpDto: UpdateFollowUpDto) {
    return this.followUpService.update(+id, updateFollowUpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followUpService.remove(+id);
  }

  //@Roles('admin')
  //@UseGuards(SessionAuthGuard, RolesGuard)
  @Get('export/:mail')
  getMailCounts(@Param('mail') mail: string) {
    const count = this.followUpService.getMailCounts();
    
  }
}
