import { Module } from '@nestjs/common';
import { MotivesService } from './motives.service';
import { MotivesController } from './motives.controller';

@Module({
  controllers: [MotivesController],
  providers: [MotivesService],
})
export class MotivesModule {}
