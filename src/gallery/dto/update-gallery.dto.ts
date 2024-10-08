import { IsUUID, IsString, IsOptional } from 'class-validator';

export class UpdateGalleryDto {
  @IsOptional()
  @IsUUID() // Optional UUID for updating event_id
  event_id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
