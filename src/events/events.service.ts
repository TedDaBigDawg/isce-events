import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { v4 as guid } from 'uuid';
import slugify from 'slugify';
import { sortDate } from 'src/utils/sort.utils';
import { Price } from '@prisma/client';
import { MailService } from 'src/utils/mail.service';
import { PriceService } from 'src/price/price.service';
import { CreateEventDto } from './dto/create-event.dto';
import { GalleryService } from 'src/gallery/gallery.service';
import { AttendeesService } from 'src/attendees/attendees.service';

@Injectable()
export class EventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly priceService: PriceService, 
    private readonly galleryService: GalleryService,
    private readonly attendeesService: AttendeesService,
  ) {} // Inject PrismaService and mail service

  // Method to handle all event creation logic
  async createEvent(createEventDto: CreateEventDto) {

    try {
      const clean_name = slugify(createEventDto?.title);

      // Check if event with the slug already exists
      const existingEvent = await this.prisma.event.findUnique({
        where: { clean_name },
      });
      if (existingEvent) {
        throw new HttpException('Event name already exists', HttpStatus.BAD_REQUEST);
      }

      // Validate prices
      const prices = createEventDto?.prices;

      if (!prices || prices.length < 1) {
        throw new HttpException('Unable to create event due to missing prices', HttpStatus.BAD_REQUEST);
      }

      // Create event in the database
      const event = await this.prisma.event.create({
        data: {
          id: guid(), // Generate unique ID for the event
          image: createEventDto?.image,
          clean_name,
          title: createEventDto?.title,
          location: createEventDto?.location,
          description: createEventDto?.description,
          start_date: new Date(createEventDto?.start_date), // Convert to Date object
          end_date: new Date(createEventDto?.end_date),
          prices: {
            create: prices.map(price => ({ // Associate the event_id of the event created
              title: price.title,  // Use title from CreateEventDto
              amount: price.amount
            })),
          },
        },
      });
      if (!event?.id) {
        throw new HttpException('Unable to create event', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      

      // Create prices related to the event
      // if (prices.length > 1) {
      //   for (const price of prices) {
      //     await this.prisma.price.create({
      //       data: {
      //         id: guid(),
      //         event_id: event.id,
      //         ...price,
      //         order_amount: 0,
      //       },
      //     });
      //   }
      // }

      // // Create gallery related to the event
      // const gallery = createEventDto?.gallery;
      // if (gallery?.length > 0) {
      //   for (const item of gallery) {
      //     await this.prisma.gallery.create({
      //       data: {
      //         id: guid(),
      //         event_id: event.id,
      //         ...item,
      //       },
      //     });
      //   }
      // }

      // Return the created event
      return event;
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  // Method to handle event update logic
  async updateEvent(eventId: string, eventData: any, user: any) {
    try {
      // Find event by ID
      const event = await this.prisma.event.findUnique({
        where: { id: eventId },
      });

      if (!event) {
        throw new HttpException('No event specified', HttpStatus.BAD_REQUEST);
      }

      // Prepare updated data
      eventData.clean_name = slugify(eventData?.title);

      // Update the event in the database
      await this.prisma.event.update({
        where: { id: eventId },
        data: eventData,
      });

      // Handle prices if provided
      const prices = eventData?.prices;
      if (prices?.length > 0) {
        // Delete existing prices
        await this.prisma.price.deleteMany({
          where: { event_id: event.id },
        });

        // Add new prices
        for (const price of prices) {
          await this.prisma.price.create({
            data: {
              id: guid(),
              event_id: event.id,
              ...price,
              order_amount: 0,
            },
          });
        }
      }

      // Handle gallery if provided
      const gallery = eventData?.gallery;
      if (gallery?.length > 0) {
        // Delete existing gallery
        await this.prisma.gallery.deleteMany({
          where: { event_id: event.id },
        });

        // Add new gallery items
        for (const item of gallery) {
          await this.prisma.gallery.create({
            data: {
              id: guid(),
              event_id: event.id,
              ...item,
            },
          });
        }
      }

      return event;
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Method to handle event deletion logic
  async deleteEvent(eventId: string) {
    try {
      if (!eventId) {
        throw new HttpException('Invalid event id', HttpStatus.NOT_FOUND);
      }

      const event = await this.prisma.event.delete({
        where: { id: eventId },
      });

      if (!event) {
        throw new HttpException('Event not available', HttpStatus.NOT_FOUND);
      }
      
      return event;
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


//   // Method to handle fetching events logic
//   async getEvents(query: any, user: any) {
//     try {
//       let offset = 0;
//       const page = Number(query.page) || 1;
//       const limit = Number(query.limit) || 100;

//       if (page > 1) {
//         offset = limit * page - limit;
//       }

//       // Fetch events for the specific user
//     //   const events = await this.prisma.event.findMany({
//     //     where: {
//     //       user_id: user.user_id,
//     //     },
//     //     take: limit,
//     //     skip: offset,
//     //   });

//     //   // Process events
//     //   const updatedEvents = await Promise.all(events.map(async (event) => {
//     //     const item = event; // Prisma returns the entire object, not just dataValues
//     //     const prices = await this.priceService.getPricesByEventId(item.id);
//     //     const gallery = await this.galleryService.getGalleries(item.id);
//     //     const attendees = await this.attendeesService.getAttendeesByEventId(item.id);
//     //     return { ...item, prices, gallery, attendees };
//     //   }));

//     //   const sortedEvents = sortDate(updatedEvents);

//     //   const yesterday = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24);

//     //   const past = sortedEvents.filter(({ start_date }) => new Date(start_date) < yesterday);
//     //   const upcoming = sortedEvents.filter(({ start_date }) => new Date(start_date) >= yesterday);

//     //   return {
//     //     count: sortedEvents.length,
//     //     all: sortedEvents,
//     //     upcoming,
//     //     past,
//     //     user,
//     //   };
//     // } catch (error) {
//     //   throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
//     // }
//   }
// }


  async getRequestedCards(event_price_id: string, order_amount: number, user: any) {
    // Find price entry for the given event price ID
    const price = await this.prisma.price.findUnique({
      where: { id: event_price_id },
    });

    // Throw an exception if price is not found
    if (!price) {
      throw new NotFoundException('Price not found');
    }

    // Calculate updated order amount
    const updatedOrder = +order_amount + price.order_amount;

    // Check if updated order amount exceeds the limit
    if (updatedOrder > price.attendees) {
      throw new BadRequestException('Maximum amount reached');
    }

    // Send mail to ISCE and user about the card request
    await this.mailService.sendCardRequestMailToISCE(user, price, updatedOrder);
    await this.mailService.sendCardRequestMailToUser(user, price, updatedOrder);

    // Update the price table with the new order amount
    await this.prisma.price.update({ 
        where: { id: event_price_id },
        data: { order_amount: updatedOrder },
    });

    // Return the updated order amount as a response object
    return { success: 'true', order_amount: updatedOrder };
  }
}

