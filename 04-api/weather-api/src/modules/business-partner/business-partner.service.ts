import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessPartnerEntity } from './business-partner.entity';
import { CreateBusinessPartnerDto } from './business-partner.dto';

@Injectable()
export class BusinessPartnerService {
  constructor(
    @InjectRepository(BusinessPartnerEntity)
    private readonly repository: Repository<BusinessPartnerEntity>,
  ) {}

  async findAll(): Promise<BusinessPartnerEntity[]> {
    return this.repository.find({
      order: { code: 'ASC' },
    });
  }

  async create( dto: CreateBusinessPartnerDto,): Promise<BusinessPartnerEntity> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }
}
