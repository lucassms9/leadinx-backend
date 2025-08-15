import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithTenant } from '../auth/interfaces/request.interface';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: RequestWithTenant,
  ) {
    return this.productsService.create(createProductDto, req.tenant.id);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.productsService.findAll(req.tenant.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.productsService.findOne(id, req.tenant.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.productsService.remove(id, req.tenant.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
    @Req() req: RequestWithTenant,
  ) {
    return this.productsService.update(id, updateProductDto, req.tenant.id);
  }
}
