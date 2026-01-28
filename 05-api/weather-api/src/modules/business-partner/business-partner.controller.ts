import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

  @Get('partner-current/:partnerId')
  async findOne( @Param('partnerId') partnerId: string,) {
    console.log('partnerId', partnerId);
    return this.service.findCurrentPartner(partnerId);
  }

  @Post('bulk')
  async createBulk(@Body() partners: CreateBusinessPartnerDto[],): Promise<BusinessPartnerResponseDto[]> {
    return this.service.createBulk(partners);
  }
  
  @Post('load')
  async loadPartners(): Promise<BusinessPartnerResponseDto[]> {
    return this.service.loadPartners();
  }
}
