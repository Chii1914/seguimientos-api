import { Module } from '@nestjs/common';
import { StudentStateService } from './student-state.service';
import { StudentStateController } from './student-state.controller';

@Module({
  controllers: [StudentStateController],
  providers: [StudentStateService],
})
export class StudentStateModule {}
