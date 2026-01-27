import { Controller, Get, Post, Body } from '@nestjs/common';
import { BusinessPartnerService } from './business-partner.service';
import {
  CreateBusinessPartnerDto,
  BusinessPartnerResponseDto,
} from './business-partner.dto';

@Controller('business-partners')
export class BusinessPartnerController {
  constructor(
    private readonly service: BusinessPartnerService,
  ) {}

  @Get()
  async list(): Promise<BusinessPartnerResponseDto[]> {
    return this.service.findAll();
  }

  @Post()
  async create(@Body() dto: CreateBusinessPartnerDto): Promise<BusinessPartnerResponseDto> {
    return this.service.create(dto);
  }
}
