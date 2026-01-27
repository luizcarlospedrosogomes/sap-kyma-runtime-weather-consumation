import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessPartnerEntity } from './business-partner.entity';
import { BusinessPartnerService } from './business-partner.service';
import { BusinessPartnerController } from './business-partner.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BusinessPartnerEntity]),
  ],
  providers: [BusinessPartnerService],
  controllers: [BusinessPartnerController],
  exports: [BusinessPartnerService],
})
export class BusinessPartnerModule {}
