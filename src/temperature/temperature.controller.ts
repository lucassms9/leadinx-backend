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
import { TemperatureService } from './temperature.service';
import { CreateTemperatureDto } from './dto/create-temperature.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithTenant } from '../auth/interfaces/request.interface';

@Controller('temperature')
@UseGuards(JwtAuthGuard)
export class TemperatureController {
  constructor(private readonly temperatureService: TemperatureService) {}

  @Post()
  create(
    @Body() createTemperatureDto: CreateTemperatureDto,
    @Req() req: RequestWithTenant,
  ) {
    return this.temperatureService.create(createTemperatureDto, req.tenant.id);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.temperatureService.findAll(req.tenant.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.temperatureService.findOne(id, req.tenant.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.temperatureService.remove(id, req.tenant.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTemperatureDto: CreateTemperatureDto,
    @Req() req: RequestWithTenant,
  ) {
    return this.temperatureService.update(
      id,
      updateTemperatureDto,
      req.tenant.id,
    );
  }
}
