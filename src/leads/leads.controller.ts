import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithTenant } from '../auth/interfaces/request.interface';

@Controller('leads')
@UseGuards(JwtAuthGuard)
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get('new')
  findNewLeads(@Req() req: RequestWithTenant) {
    console.log('findNewLeads', req.tenant.id);
    return this.leadsService.findNewLeads(req.tenant.id);
  }

  @Post()
  create(@Body() createLeadDto: CreateLeadDto, @Req() req: RequestWithTenant) {
    return this.leadsService.create(createLeadDto, req.tenant.id, req.user.id);
  }

  @Get()
  findAll(
    @Req() req: RequestWithTenant,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('consultantName') consultantName: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('stage') stage: string,
  ) {
    console.log('findNewLeads', req.tenant.id);
    return this.leadsService.findAll(
      req.tenant.id,
      page,
      limit,
      consultantName,
      startDate,
      endDate,
      stage,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.leadsService.findOne(id, req.tenant.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeadDto: UpdateLeadDto,
    @Req() req: RequestWithTenant,
  ) {
    return this.leadsService.update(id, updateLeadDto, req.tenant.id);
  }
}
