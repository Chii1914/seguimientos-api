import { StudentModule } from './student/student.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { FollowUpModule } from './follow-up/follow-up.module';
import { MotivesModule } from './motives/motives.module';
import { StudentStateModule } from './student-state/student-state.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


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
  StudentModule,
  FollowUpModule,
  MotivesModule,
  StudentStateModule,
  UserModule,
  AuthModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
