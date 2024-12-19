import { Module } from '@nestjs/common';
import { DockService } from './dock.service';

@Module({
  controllers: [],
  providers: [DockService],
})
export class DockModule {}
