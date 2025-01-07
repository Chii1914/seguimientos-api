import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({

  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '300m' },
  }),],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule.forFeature([User])]
})
export class UserModule { }
