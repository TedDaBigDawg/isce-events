import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate, IsUUID, ValidateNested } from 'class-validator';
import { UpdatePriceDto } from 'src/price/dto/update-price.dto';


export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  clean_name?: string;

  @IsOptional()
  @IsDate()
  start_date?: Date;

  @IsOptional()
  @IsDate()
  end_date?: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdatePriceDto)
  prices?: UpdatePriceDto[];
}
