import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreatePriceDto {
  @IsOptional()
  @IsString()
  event_id?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsInt()
  amount: number;

  @IsOptional()
  @IsInt()
  attendees?: number;

  @IsOptional()
  @IsString()
  withChips?: string; // default is "without"

}
