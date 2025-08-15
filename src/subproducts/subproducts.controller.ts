import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { SubProductsService } from './subproducts.service';
import { CreateSubProductDto } from './dto/create-subproduct.dto';
import { UpdateSubProductDto } from './dto/update-subproduct.dto';
import { RequestWithTenant } from 'src/auth/interfaces/request.interface';

@Controller('subproducts')
export class SubProductsController {
  constructor(private readonly subProductsService: SubProductsService) {}

  @Post()
  create(
    @Body() createSubProductDto: CreateSubProductDto,
    @Req() req: RequestWithTenant,
  ) {
    return this.subProductsService.create({
      ...createSubProductDto,
      tenantId: req.tenant.id,
    });
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.subProductsService.findAll(req.tenant.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subProductsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubProductDto: UpdateSubProductDto,
  ) {
    return this.subProductsService.update(id, updateSubProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subProductsService.remove(id);
  }
}
