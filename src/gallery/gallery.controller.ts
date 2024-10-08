import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Controller('gallery')
export class GalleryController {
    constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createGallery(@Body() createGalleryDto: CreateGalleryDto) {
    return this.galleryService.createGallery(createGalleryDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateGallery(
    @Param('id') id: string,
    @Body() updateGalleryDto: UpdateGalleryDto
  ) {
    return this.galleryService.updateGallery(id, updateGalleryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteGallery(@Param('id') id: string) {
    return this.galleryService.deleteGallery(id);
  }

  @Get(':event_id')
  async getGalleries(@Param('event_id') eventId: string) {
    return this.galleryService.getGalleries(eventId);
  }

  @Get('single/:id')
  async getGallery(@Param('id') id: string) {
    return this.galleryService.getGallery(id);
  }
}
