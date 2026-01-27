import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { UvService } from './uv.service';

@Controller('uv')
export class UvController {
  constructor(private readonly uvService: UvService) {}

  @Get('current')
  async getCurrent(@Query('lat') lat?: string, @Query('lon') lon?: string,) {
    if (!lat || !lon) {
      throw new BadRequestException('lat e lon são obrigatórios');
    }

    const latitude = lat;
    const longitude = lon;
    return this.uvService.getCurrentUv(latitude, longitude);
  }
}
