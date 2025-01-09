import { Global, Module } from '@nestjs/common';
import { MotivesService } from './motives.service';
import { MotivesController } from './motives.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motives } from './entities/motive.entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Motives])],
  controllers: [MotivesController],
  providers: [MotivesService],
  exports: [TypeOrmModule.forFeature([Motives])],
})
export class MotivesModule {}
