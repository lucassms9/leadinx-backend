import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTemperatureDto } from './dto/create-temperature.dto';

@Injectable()
export class TemperatureService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTemperatureDto: CreateTemperatureDto, tenantId: string) {
    return this.prisma.temperature.create({
      data: {
        ...createTemperatureDto,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.temperature.findMany({
      where: { tenantId },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.temperature.findFirst({
      where: { id, tenantId },
    });
  }

  async remove(id: string, tenantId: string) {
    return this.prisma.temperature.deleteMany({
      where: { id, tenantId },
    });
  }

  async update(
    id: string,
    updateTemperatureDto: CreateTemperatureDto,
    tenantId: string,
  ) {
    return this.prisma.temperature.updateMany({
      where: { id, tenantId },
      data: updateTemperatureDto,
    });
  }
}
