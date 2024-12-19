import { Module } from '@nestjs/common';
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
})
export class AppModule {}
