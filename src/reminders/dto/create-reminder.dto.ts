import { IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReminderDto {
  @IsString()
  name: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  leadId: string;
}
