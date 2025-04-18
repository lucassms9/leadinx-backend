import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Injectable()
export class RemindersService {
  constructor(private prisma: PrismaService) {}

  create(createReminderDto: CreateReminderDto) {
    return this.prisma.reminder.create({
      data: createReminderDto,
    });
  }

  findAll(tenantId: string) {
    return this.prisma.reminder.findMany({
      where: {
        lead: {
          tenantId,
        },
      },
      include: {
        lead: true,
      },
    });
  }

  findTodayReminders(tenantId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.prisma.reminder.findMany({
      where: {
        lead: {
          tenantId,
        },
        date: {
          gte: today,
          lt: tomorrow,
        },
        completed: false,
      },
      include: {
        lead: true,
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  findOne(id: string, tenantId: string) {
    return this.prisma.reminder.findFirst({
      where: {
        id,
        lead: {
          tenantId,
        },
      },
      include: {
        lead: true,
      },
    });
  }

  update(id: string, updateReminderDto: UpdateReminderDto, tenantId: string) {
    return this.prisma.reminder.update({
      where: {
        id,
        lead: {
          tenantId,
        },
      },
      data: updateReminderDto,
      include: {
        lead: true,
      },
    });
  }

  remove(id: string, tenantId: string) {
    return this.prisma.reminder.delete({
      where: {
        id,
        lead: {
          tenantId,
        },
      },
    });
  }

  async markAsCompleted(id: string, tenantId: string) {
    return this.prisma.reminder.update({
      where: {
        id,
        lead: {
          tenantId,
        },
      },
      data: { completed: true },
      include: {
        lead: true,
      },
    });
  }
}
