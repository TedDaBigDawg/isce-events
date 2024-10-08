import { Controller, Post, Body, Req, HttpException, HttpStatus, Put, Param, Delete, Get, Query, Res } from '@nestjs/common';
import { EventService } from './events.service';
import { Request, Response } from 'express';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

// Route to handle creating an event
  @Post('create')
  async createEvent(@Body() createEventDto: CreateEventDto, @Req() req: Request) {
    try {
      const result = await this.eventService.createEvent(createEventDto);
      return {
        success: true,
        message: 'Event created successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

// Route to handle retrieving and processing events
  // @Get()
  // async getEvents(@Query() query: any, @Req() req: any) {
  //   try {
  //     const eventsData = await this.eventService.getEvents(query, req.user);
  //     return {
  //       success: true,
  //       data: eventsData,
  //     };
  //   } catch (error) {
  //     throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }


// Route to handle updating an event with id
  @Put(':id/update')
  async updateEvent(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @Req() req: Request) {
    try {
      const updatedEvent = await this.eventService.updateEvent(id, updateEventDto, req.user);
      return {
        success: true,
        data: updatedEvent,
      };
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


// Route to handle deleting an event with id
  @Delete(':id/delete')
  async deleteEvent(@Param('id') id: string) {
    try {
      await this.eventService.deleteEvent(id);
      return {
        success: true,
        message: 'Event deleted',
      };
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('request-cards')
  async getRequestedCards(
    @Body() body: { event_price_id: string; order_amount: number },
    @Req() req,
    @Res() res: Response
  ) {
    try {
      const user = req.isce_auth; // Assuming user details are attached to the request
      const { event_price_id, order_amount } = body;

      // Delegate to the service for all business logic
      const result = await this.eventService.getRequestedCards(event_price_id, order_amount, user);
      
      return res.send(result);
    } catch (error) {
      // Handle any errors and send the response
      return res.status(error.status || 500).send({
        success: 'false',
        message: error.message || 'Unable to process request',
      });
    }
  }
}
