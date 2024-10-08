import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { EventsModule } from './events/events.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { PriceModule } from './price/price.module';
import { GalleryModule } from './gallery/gallery.module';
import { AttendeesModule } from './attendees/attendees.module';
//import { CardModule } from './card/card.module';
import { ArenaModule } from './arena/arena.module';

@Module({
  imports: [
    PrismaModule, 
    EventsModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.your-email-provider.com', // SMTP server host
        port: 587, // SMTP port
        secure: false, // Set to true if you're using SSL (port 465)
        auth: {
          user: 'your-email@example.com', // Your email
          pass: 'your-email-password', // Your email password
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>', // Default from email
      },
      template: {
        dir: join(__dirname, 'templates'), // Directory for email templates
        adapter: new HandlebarsAdapter(), // Using Handlebars for email templating
        options: {
          strict: true,
        },
      },
    }),
    PriceModule,
    GalleryModule,
    AttendeesModule,
    // CardModule,
    ArenaModule,
  ],
})
export class AppModule {}
