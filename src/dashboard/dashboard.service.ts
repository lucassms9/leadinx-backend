import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboardData(tenantId: string) {
    const leads = await this.prisma.lead.findMany({
      where: { tenantId },
      include: {
        messages: true,
        reminders: true,
      },
    });

    return {
      totalLeads: leads.length,
      newLeads: leads.filter((lead) => lead.status === 'NOVO').length,
      inContactLeads: leads.filter((lead) => lead.status === 'EM_CONTATO')
        .length,
      convertedLeads: leads.filter((lead) => lead.status === 'CONVERTIDO')
        .length,
    };
  }
}
