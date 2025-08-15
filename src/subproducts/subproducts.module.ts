import { Module } from '@nestjs/common';
import { SubProductsService } from './subproducts.service';
import { SubProductsController } from './subproducts.controller';

@Module({
  controllers: [SubProductsController],
  providers: [SubProductsService],
})
export class SubProductsModule {}
