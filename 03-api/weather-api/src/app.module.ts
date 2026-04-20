import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './modules/weather/weather.module';

import typeorm from './typeorm';
import { UvModule } from './modules/uv/uv.module';
import { BusinessPartnerModule } from './modules/business-partner/business-partner.module';
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 5 * 60 * 1000, // 5 minutos
      max: 100, // até 100 entradas
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [typeorm], }),
    HttpModule.register({ timeout: 5000 }),
   
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const db = config.get('database');

        return {
          ...db,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
  
    }),
    WeatherModule,
    UvModule,
    BusinessPartnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
