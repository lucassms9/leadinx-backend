import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStatusDto } from './dto/create-status.dto';

@Injectable()
export class StatusService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStatusDto: CreateStatusDto, tenantId: string) {
    return this.prisma.status.create({
      data: {
        ...createStatusDto,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.status.findMany({
      where: { tenantId },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.status.findFirst({
      where: { id, tenantId },
    });
  }

  async remove(id: string, tenantId: string) {
    return this.prisma.status.deleteMany({
      where: { id, tenantId },
    });
  }

  async update(id: string, updateStatusDto: CreateStatusDto, tenantId: string) {
    return this.prisma.status.updateMany({
      where: { id, tenantId },
      data: updateStatusDto,
    });
  }
}
