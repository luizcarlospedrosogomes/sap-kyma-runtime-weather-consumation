// weather.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('current')
  async getCurrent(@Query('lat') lat?: string, @Query('lon') lon?: string,) {
    const latitude = lat
    const longitude = lon

    return this.weatherService.getCurrentWeather(latitude, longitude);
  }
}
