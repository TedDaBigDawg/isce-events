import { IsString, IsOptional, IsBoolean, IsEmail, IsUUID } from 'class-validator';

export class CreateAttendeeDto {
  @IsUUID()
  event_id: string;

  @IsUUID()
  event_price_id: string;

  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  price_category?: string;

  @IsOptional()
  @IsString()
  ticket?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  token?: string;

  @IsOptional()
  @IsBoolean()
  checkedIn?: boolean;

  @IsOptional()
  @IsBoolean()
  thankyouMail?: boolean;
}
