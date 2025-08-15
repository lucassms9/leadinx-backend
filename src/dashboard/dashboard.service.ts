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

    const totalLeads = leads.length;
    const convertedLeads = leads.filter((lead) => lead.status === 'CONVERTIDO');
    const totalSales = convertedLeads.length;

    // Calcular taxa de conversão
    const conversionRate = totalLeads > 0 ? (totalSales / totalLeads) * 100 : 0;

    // Calcular ticket médio
    const totalValue = convertedLeads.reduce((sum, lead) => {
      const value = parseFloat(lead.value.replace(/[^\d.-]/g, '')) || 0;
      return sum + value;
    }, 0);

    const averageTicket = totalSales > 0 ? totalValue / totalSales : 0;

    return {
      totalLeads,
      totalSales,
      conversionRate: Number(conversionRate.toFixed(2)),
      averageTicket: Number(averageTicket.toFixed(2)),
    };
  }
}
