import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Repository, MoreThan } from 'typeorm';

import { UvApiResponse } from './uv-response.dto';
import { UvEntity } from './uv.entity';

@Injectable()
export class UvService {
  private readonly logger = new Logger(UvService.name);
  private readonly baseUrl =
    process.env.UV_API_URL || 'https://currentuvindex.com/api/v1/uvi';

  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    @InjectRepository(UvEntity)
    private readonly uvRepository: Repository<UvEntity>,
    private readonly httpService: HttpService,
  ) {}

  // 🔁 Entry point
  async getCurrentUv(latitude: string, longitude: string): Promise<any> {
    const cacheKey = `uv:${latitude}:${longitude}`;

    // 1️⃣ CACHE EM MEMÓRIA
    const cached = await this.cache.get<UvEntity>(cacheKey);
    if (cached) {
      return { source: 'cache', data: cached };
    }

    // 2️⃣ BANCO (última 1 hora)
    const fromDb = await this.getUvFromDb(latitude, longitude);
    if (fromDb) {
      return fromDb;
    }

    // 3️⃣ API EXTERNA
    return this.getUvFromApi(latitude, longitude);
  }

  private async getUvFromDb(latitude: string, longitude: string): Promise<any> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const cacheKey = `uv:${latitude}:${longitude}`;

    const fromDb = await this.uvRepository.findOne({
      where: {
        latitude,
        longitude,
        dateTime: MoreThan(oneHourAgo),
      },
      order: { dateTime: 'DESC' },
    });

    if (fromDb) {
      await this.cache.set(cacheKey, fromDb);
      return { source: 'database', data: fromDb };
    }
  }


  private async getUvFromApi(latitude: string, longitude: string): Promise<any> {
    const params = { latitude, longitude };

    try {
      const response = await firstValueFrom(
        this.httpService.get<UvApiResponse>(this.baseUrl, { params }),
      );

      return this.saveUvToDb(latitude, longitude, response.data);
    } catch (error) {
      const err = error as AxiosError;
      this.logger.error(`Erro ao chamar UV API: ${err.message}`, err.stack);
      throw new Error('Falha ao consultar serviço de índice UV');
    }
  }


  private async saveUvToDb(latitude: string, longitude: string, data: UvApiResponse,): Promise<any> {
    const cacheKey = `uv:${latitude}:${longitude}`;

    const entity = this.uvRepository.create({
      latitude,
      longitude,
      dateTime: new Date(),
      uv: data.now?.uvi,
     
    });

    const saved = await this.uvRepository.save(entity);

    await this.cache.set(cacheKey, saved);

    return { source: 'api', data: saved };
  }
}
