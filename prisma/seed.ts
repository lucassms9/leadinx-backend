import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Criar tenant master
  const masterTenant = await prisma.tenant.upsert({
    where: { cnpj: '00000000000000' },
    update: {},
    create: {
      name: 'Master Tenant',
      cnpj: '00000000000000',
      email: 'master@leadinx.com',
      phone: '00000000000',
      address: 'Master Address',
      city: 'Master City',
      state: 'MS',
      zipCode: '00000000',
      isActive: true,
    },
  });

  // Criar usuário admin master
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@leadinx.com' },
    update: {},
    create: {
      name: 'Admin Master',
      email: 'admin@leadinx.com',
      password: hashedPassword,
      isActive: true,
      tenantId: masterTenant.id,
    },
  });

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
