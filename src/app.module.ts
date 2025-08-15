import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { LeadsModule } from './leads/leads.module';
import { TenantsModule } from './tenants/tenants.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RemindersModule } from './reminders/reminders.module';
import { ProductsModule } from './products/products.module';
import { SubProductsModule } from './subproducts/subproducts.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    LeadsModule,
    TenantsModule,
    DashboardModule,
    RemindersModule,
    ProductsModule,
    SubProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
