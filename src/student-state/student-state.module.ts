import { Module } from '@nestjs/common';
import { StudentStateService } from './student-state.service';
import { StudentStateController } from './student-state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentState } from './entities/student-state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentState])],
  controllers: [StudentStateController],
  providers: [StudentStateService],
  exports: [TypeOrmModule.forFeature([StudentState])],
})
export class StudentStateModule {}
