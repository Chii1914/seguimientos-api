import { Global, Module } from '@nestjs/common';
import { DockService } from './dock.service';
@Global()

@Module({
  controllers: [],
  providers: [DockService],
  exports: [DockService],
})
export class DockModule {}
