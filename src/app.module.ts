import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FollowUpModule } from './follow-up/follow-up.module';
import { MotivesModule } from './motives/motives.module';
import { StudentModule } from './student/student.module';
import { StudentStateModule } from './student-state/student-state.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [UserModule, FollowUpModule, MotivesModule, StudentModule, StudentStateModule, MailerModule],
  controllers: [AppController],
  providers: [AppService],
=======
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
      type: 'mysql',
      host: configService.get<string>('DB_HOST') || 'localhost',
      port: parseInt(configService.get<string>('DB_PORT')) || 3306,
      username: configService.get<string>('DB_USERNAME') || 'root',
      password: configService.get<string>('DB_PASSWORD') || '',
      database: configService.get<string>('DB_NAME') || 'practica',
      autoLoadEntities: true,
      synchronize: configService.get<string>('TYPEORM_SYNC') === 'true',
    }),
    inject: [ConfigService], 
  }),
],
  controllers: [],
  providers: [],
>>>>>>> dc4ebf5 (conexion base de datos)
})
export class AppModule {}
