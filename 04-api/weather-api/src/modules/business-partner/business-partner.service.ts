import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessPartnerEntity } from './business-partner.entity';
import { CreateBusinessPartnerDto } from './business-partner.dto';
import { UvService } from '../uv/uv.service';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class BusinessPartnerService {
  constructor(
    @InjectRepository(BusinessPartnerEntity)
    private readonly repository: Repository<BusinessPartnerEntity>,
    private readonly weatherService: WeatherService,
    private readonly uvService: UvService,
  ) { }

  async findAll(): Promise<BusinessPartnerEntity[]> {
    return this.repository.find({
      order: { code: 'ASC' },
    });
  }

  async create(dto: CreateBusinessPartnerDto,): Promise<BusinessPartnerEntity> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async findCurrentPartner(partnerId: string) {
    // 1️⃣ Buscar parceiro
    const partner = await this.repository.findOne({
      where: { code: partnerId },
    });

    if (!partner) {
      throw new NotFoundException(`Business Partner ${partnerId} não encontrado`,);
    }

    const { latitude, longitude } = partner;

    // 2️⃣ Buscar dados ambientais em paralelo
    const [weather, uv] = await Promise.all([
      this.weatherService.getCurrentWeather(latitude, longitude),
      this.uvService.getCurrentUv(latitude, longitude),
    ]);

    // 3️⃣ Resposta agregada
    return {
      partner: {
        code: partner.code,
        description: partner.description,
        latitude: partner.latitude,
        longitude: partner.longitude,
      },
      weather,
      uv,
    };
  }

  async createBulk(partners: CreateBusinessPartnerDto[],): Promise<BusinessPartnerEntity[]> {
    const entities = this.repository.create(partners);
    return this.repository.save(entities);
  }

  async loadPartners(): Promise<BusinessPartnerEntity[]> {
    const samplePartners: CreateBusinessPartnerDto[] = [
      { code: 'C001', description: 'Partner C001 - Curitiba', latitude: '-25.4284', longitude: '-49.2733', },
      { code: 'C002', description: 'Partner C002 - São Paulo', latitude: '-23.5505', longitude: '-46.6333', },
      { code: 'C003', description: 'Partner C003 - Campo Grande', latitude: '-20.4697', longitude: '-54.6201', },
      { code: 'C004', description: 'Partner C004 - Goiania', latitude: '-16.6869', longitude: '-49.2648', },
    ]
    try {
      const entities = this.repository.create(samplePartners);
      return this.repository.save(entities);
    } catch (error: any) {
      throw new Error(`Erro ao carregar parceiros: ${error.message}`);
    }

  }
}
