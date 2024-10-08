import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { Price } from '@prisma/client';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PriceService {

  private readonly logger = new Logger(PriceService.name);

  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService

  // Method to handle creating prices
  // async createPrice(createPriceDto: CreatePriceDto): Promise<Price> {
  //   try {
  //     const price = await this.prisma.price.create({
  //       data: {
  //         title: createPriceDto.title,
  //         amount: createPriceDto.amount,
  //         event: {
  //           connect: { id: createPriceDto.event_id }, // Linking the price to the event
  //         },
  //       },
  //     });
  //     return price;
  //   } catch (error) {
  //     this.logger.error('Error creating price', error);
  //     throw new Error('Unable to create price'); 
  //   }
  // }


  // Method to handle the updating of prices using the id
  async updatePrice(id: string, updatePriceDto: UpdatePriceDto): Promise<Price> {
    try {
      const existingPrice = await this.prisma.price.findUnique({
        where: { id },
      });

      if (!existingPrice) {
        throw new NotFoundException('Price not found');
      }

      const updatedPrice = await this.prisma.price.update({
        where: { id },
        data: updatePriceDto,
      });

      return updatedPrice;
    } catch (error) {
      this.logger.error('Error updating price', error);
      throw new Error('Unable to update price'); 
    }
  }


// Method to handle getting all the prices related to a specific event
async getPricesByEventId(eventId: string): Promise<Price[]> {
    try {
      const prices = await this.prisma.price.findMany({
        where: { event_id: eventId },
      });

      return prices;
    } catch (error) {
      this.logger.error('Error fetching prices', error);
      throw new Error('Unable to fetch prices'); 
    }
  }

// Method to handle getting a specific price using the unique price id(PK)
  async getPriceById(priceId: string): Promise<Price | null> {
    try {
      const price = await this.prisma.price.findUnique({
        where: { id: priceId },
      });

      return price;
    } catch (error) {
      this.logger.error('Error fetching price', error);
      throw new Error('Unable to fetch price'); 
    }
  }

}
