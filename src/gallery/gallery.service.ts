import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Injectable()
export class GalleryService {
    constructor(private readonly prisma: PrismaService) {}

    // Create a new gallery entry
    async createGallery(createGalleryDto: CreateGalleryDto) {
      try {
        const gallery = await this.prisma.gallery.create({
          data: {
            event_id: createGalleryDto.event_id,
            name: createGalleryDto.name,
            image: createGalleryDto.image,
          },
        });
        return { success: true, data: gallery };
      } catch (error) {
        // Handle error (logger can be added here)
        throw new Error('Unable to create gallery entry');
      }
    }

    async updateGallery(id: string, updateGalleryDto: UpdateGalleryDto) {
        try {
          const gallery = await this.prisma.gallery.update({
            where: { id },
            data: {
              event_id: updateGalleryDto.event_id,
              name: updateGalleryDto.name,
              image: updateGalleryDto.image,
            },
          });
          return { success: true, data: gallery };
        } catch (error) {
          // Handle error (logger can be added here)
          throw new Error('Unable to update gallery entry');
        }
    }

    // Method to delete a gallery entry
    async deleteGallery(id: string) {
        try {
        await this.prisma.gallery.delete({
            where: { id },
        });

        return {
            success: true,
            message: 'Gallery deleted successfully',
        };
        } catch (error) {
        // Log the error or handle it (logger can be added here)
        throw new Error('Unable to delete gallery');
        }
    }


    // Method to get all galleries for a specific event
  async getGalleries(eventId: string) {
    try {
      const galleries = await this.prisma.gallery.findMany({
        where: { event_id: eventId },
      });

      return {
        success: true,
        data: galleries,
      };
    } catch (error) {
      // Log the error or handle it (logger can be added here)
      console.error(error);
      return {
        success: false,
        data: [], // Return an empty array or handle the error as required
      };
    }
}


   // Method to get a single gallery by its ID
   async getGallery(id: string) {
    try {
      const data = await this.prisma.gallery.findUnique({
        where: { id },
      });

      if (data) {
        return {
          success: true,
          data,
        };
      } else {
        return {
          success: false,
          message: 'No data found',
        };
      }
    } catch (error) {
      // Log or handle error here (logger can be added)
      throw new Error('Unable to retrieve the gallery');
    }
  }
}

