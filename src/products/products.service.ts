import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto, tenantId: string) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.product.findMany({
      where: { tenantId },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.product.findFirst({
      where: { id, tenantId },
    });
  }

  async remove(id: string, tenantId: string) {
    return this.prisma.product.deleteMany({
      where: { id, tenantId },
    });
  }

  async update(
    id: string,
    updateProductDto: CreateProductDto,
    tenantId: string,
  ) {
    return this.prisma.product.updateMany({
      where: { id, tenantId },
      data: updateProductDto,
    });
  }
}
