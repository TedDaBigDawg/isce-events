import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { MailService } from 'src/utils/mail.service';
import { PrismaService } from 'prisma/prisma.service';
import { GalleryService } from 'src/gallery/gallery.service';
import { AttendeesService } from 'src/attendees/attendees.service';
import { PriceService } from 'src/price/price.service';

@Module({
  providers: [EventService, MailService, PrismaService, GalleryService, AttendeesService, PriceService],
  controllers: [EventController]
})
export class EventsModule {}
