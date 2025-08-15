import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto, tenantId: string) {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        tenantId: createUserDto.tenantId || tenantId,
        isActive: true,
      },
    });
  }

  findAll(tenantId: string) {
    return this.prisma.user.findMany({
      where: {
        tenantId,
        isActive: true, // Apenas usuários ativos
      },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findOne(id: string, tenantId: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
        tenantId,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto, tenantId: string) {
    if (updateUserDto.password) {
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
    }

    return this.prisma.user.update({
      where: { id, tenantId },
      data: {
        ...updateUserDto,
        tenantId: tenantId, // Garante que o tenantId seja sempre atualizado
      },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // Soft delete - marca como inativo
  remove(id: string, tenantId: string) {
    return this.prisma.user.update({
      where: { id, tenantId },
      data: { isActive: false },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        updatedAt: true,
      },
    });
  }
}
