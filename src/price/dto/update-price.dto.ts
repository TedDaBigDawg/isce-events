import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdatePriceDto {
  @IsOptional()
  @IsString()
  event_id?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  amount?: number;

  @IsOptional()
  @IsInt()
  attendees?: number;

  @IsOptional()
  @IsString()
  withChips?: string; // This field is optional as well
}
