import {
  IsString,
  IsOptional,
  IsDate,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LeadStatus } from '@prisma/client';

class MessageDto {
  @IsString()
  type: 'email' | 'phone' | 'whatsapp' | 'in_person';

  @IsString()
  content: string;

  @IsString()
  sender: 'user' | 'lead';
}

class ReminderDto {
  @IsString()
  name: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsOptional()
  completed?: boolean;
}

export class CreateLeadDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  company: string;

  @IsEnum(LeadStatus)
  status: LeadStatus;

  @IsString()
  stage: string;

  @IsString()
  temperature: string;

  @IsString()
  source: string;

  @IsString()
  @IsOptional()
  sourceSite?: string;

  @IsString()
  @IsOptional()
  sourceSocial?: string;

  @IsString()
  @IsOptional()
  sourceVisit?: string;

  @IsString()
  product: string;

  @IsString()
  model: string;

  @IsString()
  value: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  reminder?: Date;

  @IsString()
  @IsOptional()
  reminderName?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  @IsOptional()
  messages?: MessageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReminderDto)
  @IsOptional()
  reminders?: ReminderDto[];
}
