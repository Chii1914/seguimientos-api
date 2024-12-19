import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FollowUpModule } from './follow-up/follow-up.module';
import { MotivesModule } from './motives/motives.module';
import { StudentModule } from './student/student.module';
import { StudentStateModule } from './student-state/student-state.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [UserModule, FollowUpModule, MotivesModule, StudentModule, StudentStateModule, MailerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
