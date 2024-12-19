import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FollowUpModule } from './follow-up/follow-up.module';
import { MotivesModule } from './motives/motives.module';
import { StudentModule } from './student/student.module';
import { StudentStateModule } from './student-state/student-state.module';

@Module({
  imports: [UserModule, FollowUpModule, MotivesModule, StudentModule, StudentStateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
