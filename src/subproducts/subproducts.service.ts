import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubProductDto } from './dto/create-subproduct.dto';
import { UpdateSubProductDto } from './dto/update-subproduct.dto';

@Injectable()
export class SubProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSubProductDto: CreateSubProductDto) {
    return this.prisma.subProduct.create({
      data: createSubProductDto,
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.subProduct.findMany({
      where: { tenantId },
    });
  }

  findOne(id: string) {
    return this.prisma.subProduct.findUnique({
      where: { id },
    });
  }

  update(id: string, updateSubProductDto: UpdateSubProductDto) {
    return this.prisma.subProduct.update({
      where: { id },
      data: updateSubProductDto,
    });
  }

  remove(id: string) {
    return this.prisma.subProduct.delete({
      where: { id },
    });
  }
}
