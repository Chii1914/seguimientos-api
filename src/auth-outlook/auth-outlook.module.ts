import { AuthOutlookService } from './auth-outlook.service';
import { AuthOutlookController } from './auth-outlook.controller';

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MicrosoftStrategy } from './strategy/microsoft.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '300m' },
    }),
  ],
  controllers: [AuthOutlookController],
  providers: [AuthOutlookService, MicrosoftStrategy, JwtStrategy],
})
export class AuthOutlookModule {}
