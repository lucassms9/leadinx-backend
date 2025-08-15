import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStageDto } from './dto/create-stage.dto';

@Injectable()
export class StageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStageDto: CreateStageDto, tenantId: string) {
    return this.prisma.stage.create({
      data: {
        ...createStageDto,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.stage.findMany({
      where: { tenantId },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.stage.findFirst({
      where: { id, tenantId },
    });
  }

  async remove(id: string, tenantId: string) {
    return this.prisma.stage.deleteMany({
      where: { id, tenantId },
    });
  }

  async update(id: string, updateStageDto: CreateStageDto, tenantId: string) {
    return this.prisma.stage.updateMany({
      where: { id, tenantId },
      data: updateStageDto,
    });
  }
}
