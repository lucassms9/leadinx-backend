import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTemperatureDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
