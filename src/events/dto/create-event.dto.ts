import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate, IsUUID, ValidateNested, IsDateString } from 'class-validator';
import { CreateGalleryDto } from 'src/gallery/dto/create-gallery.dto';
import { CreatePriceDto } from 'src/price/dto/create-price.dto';

export class CreateEventDto {
  @IsString()
  title: string;

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
  clean_name?: string; // This should be unique, but it's okay to validate at the service level

  @IsDateString()
  start_date: Date;

  @IsOptional()
  @IsDateString()
  end_date?: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePriceDto)
  prices?: CreatePriceDto[]; 


  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateGalleryDto)
  gallery?: CreateGalleryDto[]; 

  // Additional fields can be added for prices, gallery, attendees, etc.
}
