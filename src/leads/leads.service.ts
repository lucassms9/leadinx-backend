import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  create(createLeadDto: CreateLeadDto, tenantId: string) {
    return this.prisma.lead.create({
      data: {
        ...createLeadDto,
        tenantId,
        messages: createLeadDto.messages && {
          create: createLeadDto.messages,
        },
        reminders: createLeadDto.reminders && {
          create: createLeadDto.reminders,
        },
      },
      include: {
        messages: true,
        reminders: true,
      },
    });
  }

  findAll(tenantId: string) {
    return this.prisma.lead.findMany({
      where: { tenantId },
      include: {
        messages: true,
        reminders: true,
      },
    });
  }

  findOne(id: string, tenantId: string) {
    return this.prisma.lead.findUnique({
      where: { id, tenantId },
      include: {
        messages: true,
        reminders: true,
      },
    });
  }

  update(id: string, updateLeadDto: UpdateLeadDto, tenantId: string) {
    return this.prisma.lead.update({
      where: { id, tenantId },
      data: {
        ...updateLeadDto,
        messages: updateLeadDto.messages && {
          deleteMany: {},
          create: updateLeadDto.messages,
        },
        reminders: updateLeadDto.reminders && {
          deleteMany: {},
          create: updateLeadDto.reminders,
        },
      },
      include: {
        messages: true,
        reminders: true,
      },
    });
  }

  remove(id: string, tenantId: string) {
    return this.prisma.lead.delete({
      where: { id, tenantId },
    });
  }

  async findNewLeads(tenantId: string) {
    console.log('findNewLeads', tenantId);
    const leads = await this.prisma.lead.findMany({
      where: {
        tenantId,
        status: 'NOVO',
      },
    });

    return leads.map((lead) => ({
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
    }));
  }
}
