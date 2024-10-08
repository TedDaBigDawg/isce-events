import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';

@Controller('attendees')
export class AttendeesController {
    constructor(private readonly attendeeService: AttendeesService) {}

    @Post()
    async createAttendee(@Body() createAttendeeDto: CreateAttendeeDto) {
      const attendee = await this.attendeeService.createAttendee(createAttendeeDto);
      return {
        success: true,
        data: attendee,
      };
    }


    @Put(':id')
    async updateAttendee(@Param('id') id: string, @Body() updateAttendeeDto: UpdateAttendeeDto) {
    const attendee = await this.attendeeService.updateAttendee(id, updateAttendeeDto);
    return {
    success: true,
    data: attendee,
        };
    }


    @Get('event/:id')
    async getAttendees(@Param('id') eventId: string) {
      const attendees = await this.attendeeService.getAttendeesByEventId(eventId);
      return {
        success: true,
        data: attendees,
      };
    }


    @Get(':id')
  async getAttendee(@Param('id') id: string) {
    const attendee = await this.attendeeService.getAttendeeById(id);
    if (attendee) {
      return {
        success: true,
        data: attendee,
      };
    } else {
      return {
        success: false,
        message: 'No data',
      };
    }
  }
}
