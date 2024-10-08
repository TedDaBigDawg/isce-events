// import { Injectable } from '@nestjs/common';
// import { Attendee, Gallery, Price } from '@prisma/client';
// import axios from 'axios';
// import { PrismaService } from 'prisma/prisma.service';
// import { AttendeesService } from 'src/attendees/attendees.service';
// import { GalleryService } from 'src/gallery/gallery.service';
// import { PriceService } from 'src/price/price.service';
// import { pastItems, upcomingItems } from 'src/utils/date.utils';


// interface EventWithDetails extends Event {
//     prices: Price[];
//     gallery: Gallery[];
//     attendees: Attendee[];
//   }


// @Injectable()
// export class CardService {
//     constructor(
//         private readonly prisma: PrismaService,
//         private readonly priceService: PriceService, 
//         private readonly galleryService: GalleryService,
//         private readonly attendeesService: AttendeesService,
//     ) {}

//   async getCardEvents(page: number, limit: number, id: string, type: string): Promise<any> {
//     try {
//       let offset = (page > 1) ? (limit * page) - limit : 0;

//       let url = `${process.env.SERVER_1}/connect/api/connect-vcard`;
//       if (id) url += `?id=${id}`;
//       if (url && type) url += `&type=${type}`;

//       if (!url) {
//         return { success: "false", message: "Invalid request parameters" };
//       }

//       const { data: response } = await axios.get(url);
//       if (response?.success !== 'true') {
//         return { success: "false", message: "Unable to connect to isce" };
//       }

//       const user_id = response?.data?.card?.user_id;

//       const events = await this.prisma.event.findMany({
//         take: limit,
//         skip: offset,
//         where: { user_id },
//       });

//       const updatedEvents = await Promise.all(events.map(async (event) => {
//         const item = event;
//         const prices = await this.priceService.getPricesByEventId(item.id);
//         const gallery = await this.galleryService.getGalleries(item.id);
//         const attendees = await this.attendeesService.getAttendeesByEventId(item.id);
//         return { ...item, prices, gallery, attendees };
//       }));

//       const past = pastItems(updatedEvents);
//       const upcoming = upcomingItems(updatedEvents);

//       return {
//         success: "true",
//         data: {
//           count: updatedEvents.length,
//           all: updatedEvents,
//           upcoming,
//           past
//         },
//       };
//     } catch (error) {
//       throw new Error('A server error occurred');
//     }
//   }



//   async getOpenEvent(query: any) {
//     let offset = 0;
//     const page = Number(query.page) || 1;
//     const limit = Number(query.limit) || 100;
//     if (page > 1) {
//       offset = limit * page - limit;
//     }

//     const name = decodeURIComponent(query?.id);
//     const event = await this.prisma.event.findFirst({
//       where: { clean_name: name },
//       take: limit,
//       skip: offset,
//     });

//     if (!event) {
//       return {
//         success: 'false',
//         message: 'Unable to retrieve event',
//       };
//     }

//     const item = event;
//     item.prices = await this.priceService.getPricesByEventId(event.id);
//     item.gallery = await this.getGallery(event.id);
//     item.attendees = await this.getAttendees(event.id);

//     return  {
//       success: 'true',
//       data: {
//         count: item.length,
//         event: item,
//       },
//     };
//   }
// }
