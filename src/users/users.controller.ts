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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithTenant } from '../auth/interfaces/request.interface';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req: RequestWithTenant) {
    return this.usersService.create(createUserDto, req.tenant.id);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.usersService.findAll(req.tenant.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.usersService.findOne(id, req.tenant.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithTenant,
  ) {
    return this.usersService.update(id, updateUserDto, req.tenant.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.usersService.remove(id, req.tenant.id);
  }
}
