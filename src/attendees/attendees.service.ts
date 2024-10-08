import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import { Attendee } from '@prisma/client';

@Injectable()
export class AttendeesService {
    constructor(private readonly prisma: PrismaService) {}

  async createAttendee(createAttendeeDto: CreateAttendeeDto) {
    try {
      const attendee = await this.prisma.attendee.create({
        data: createAttendeeDto,
      });
      return attendee;
    } catch (error) {
      throw new Error('Unable to create attendee');
    }
  }


  async updateAttendee(id: string, updateAttendeeDto: UpdateAttendeeDto) {
    try {
      const updatedAttendee = await this.prisma.attendee.update({
        where: { id },
        data: updateAttendeeDto,
      });
      return updatedAttendee;
    } catch (error) {
      throw new Error('Unable to update attendee');
    }
  }



  async getAttendeesByEventId(eventId: string) {
    try {
      const attendees = await this.prisma.attendee.findMany({
        where: {
          event_id: eventId,
        },
      });
      return attendees;
    } catch (error) {
      throw new Error('Unable to retrieve attendees');
    }
  }



  async getAttendeeById(id: string): Promise<Attendee | null> {
    try {
      const attendee = await this.prisma.attendee.findUnique({
        where: { id },
      });
      return attendee;
    } catch (error) {
      throw new Error('Unable to retrieve attendee');
    }
  }
}
