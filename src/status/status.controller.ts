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
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithTenant } from '../auth/interfaces/request.interface';

@Controller('status')
@UseGuards(JwtAuthGuard)
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  create(
    @Body() createStatusDto: CreateStatusDto,
    @Req() req: RequestWithTenant,
  ) {
    return this.statusService.create(createStatusDto, req.tenant.id);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.statusService.findAll(req.tenant.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.statusService.findOne(id, req.tenant.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.statusService.remove(id, req.tenant.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatusDto: CreateStatusDto,
    @Req() req: RequestWithTenant,
  ) {
    return this.statusService.update(id, updateStatusDto, req.tenant.id);
  }
}
