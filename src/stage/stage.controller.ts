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
import { StageService } from './stage.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithTenant } from '../auth/interfaces/request.interface';

@Controller('stage')
@UseGuards(JwtAuthGuard)
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Post()
  create(
    @Body() createStageDto: CreateStageDto,
    @Req() req: RequestWithTenant,
  ) {
    return this.stageService.create(createStageDto, req.tenant.id);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.stageService.findAll(req.tenant.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.stageService.findOne(id, req.tenant.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.stageService.remove(id, req.tenant.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStageDto: CreateStageDto,
    @Req() req: RequestWithTenant,
  ) {
    return this.stageService.update(id, updateStageDto, req.tenant.id);
  }
}
