import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessPartnerEntity } from './business-partner.entity';
import { BusinessPartnerService } from './business-partner.service';
import { BusinessPartnerController } from './business-partner.controller';
import { UvEntity } from '../uv/uv.entity';
import { WeatherEntity } from '../weather/weather.entity';
import { WeatherService } from '../weather/weather.service';
import { UvService } from '../uv/uv.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([BusinessPartnerEntity, UvEntity, WeatherEntity]),
    HttpModule,
  ],
  providers: [BusinessPartnerService, WeatherService, UvService],
  controllers: [BusinessPartnerController],
  exports: [BusinessPartnerService],
})
export class BusinessPartnerModule {}
