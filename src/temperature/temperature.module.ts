import { Module } from '@nestjs/common';
import { TemperatureService } from './temperature.service';
import { TemperatureController } from './temperature.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TemperatureController],
  providers: [TemperatureService, PrismaService],
})
export class TemperatureModule {}
