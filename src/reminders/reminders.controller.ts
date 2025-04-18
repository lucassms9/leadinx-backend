import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithTenant } from '../auth/interfaces/request.interface';

@Controller('reminders')
@UseGuards(JwtAuthGuard)
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  create(@Body() createReminderDto: CreateReminderDto) {
    return this.remindersService.create(createReminderDto);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.remindersService.findAll(req.tenant.id);
  }

  @Get('today')
  findTodayReminders(@Req() req: RequestWithTenant) {
    return this.remindersService.findTodayReminders(req.tenant.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.remindersService.findOne(id, req.tenant.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReminderDto: UpdateReminderDto,
    @Req() req: RequestWithTenant,
  ) {
    return this.remindersService.update(id, updateReminderDto, req.tenant.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.remindersService.remove(id, req.tenant.id);
  }

  @Put(':id/complete')
  markAsCompleted(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.remindersService.markAsCompleted(id, req.tenant.id);
  }
}
