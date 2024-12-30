import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Global()
@Module({

  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule.forFeature([User])]
})
export class UserModule {}
