// weather.service.ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { OpenMeteoCurrent, OpenMeteoResponse } from './open-meteo-response.dto';
import { WeatherEntity } from './weather.entity';
import { MoreThan, Repository } from 'typeorm';


@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly baseUrl =
  process.env.OPEN_METEO_URL || 'https://api.open-meteo.com/v1/forecast';

  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
    private readonly httpService: HttpService,
  ) {}


  async getCurrentWeather(latitude = '46.9481', longitude = '7.4474'): Promise<any> {
    const cacheKey = `weather:${latitude}:${longitude}`;

    // 1️⃣ CACHE EM MEMÓRIA
    const cached = await this.cache.get<WeatherEntity>(cacheKey);
    if (cached) {
      return { source: 'cache', data: cached };
    }
    const fromDb = await this.getWeatherFromDb(latitude, longitude);
    if (fromDb) {
      return fromDb;
    }
    return  await this.getWeatherByLatLonAPI(latitude, longitude);
  }

  async getWeatherFromDb(latitude: string, longitude: string): Promise<any> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const cacheKey = `weather:${latitude}:${longitude}`;
    const fromDb = await this.weatherRepository.findOne({
      where: { latitude, longitude,   dateTime: MoreThan(oneHourAgo),  },
      order: { dateTime: 'DESC' },
    });

    if (fromDb) {
      await this.cache.set(cacheKey, fromDb );
      return { source: 'database', data: fromDb, };
    }
  }

  async getWeatherByLatLonAPI(latitude: string, longitude: string,): Promise<OpenMeteoResponse> {
    const params = {
      latitude,
      longitude,
      current: 'temperature_2m,relative_humidity_2m,rain,weather_code',
    };

    try {
      const response = await firstValueFrom( this.httpService.get<OpenMeteoResponse>(this.baseUrl, { params }));
      return await this.saveWeatherToDb(latitude, longitude, response.data, response.data.current);
      } catch (error) {
      const err = error as AxiosError;
      this.logger.error(`Erro ao chamar Open-Meteo: ${err.message}`, err.stack);
      throw new Error('Falha ao consultar serviço de previsão do tempo');
    }
  }
  async saveWeatherToDb(latitude, longitude, weatherData: OpenMeteoResponse, current: OpenMeteoCurrent): Promise<any> {
    const cacheKey = `weather:${latitude}:${longitude}`;
     const entity = this.weatherRepository.create({
      latitude: latitude,
      longitude: longitude,
      dateTime: new Date(),
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      rain: current.rain,
      weatherCode: current.weather_code,
    });
    const saved = await this.weatherRepository.save(entity);
    await this.cache.set(cacheKey, saved);
    return { source: 'api', data: saved,};
    
  }
}
