import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UvController } from './uv.controller';
import { UvService } from './uv.service';
import { UvEntity } from './uv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UvEntity]),
    HttpModule
],
  controllers: [UvController],
  providers: [UvService],
})
export class UvModule {}
