import { IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateGalleryDto {
  @IsUUID() // Ensures the event_id is a valid UUID
  event_id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image?: string;
}
