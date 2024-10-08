import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { Response } from 'express';
import { UpdatePriceDto } from './dto/update-price.dto';

@Controller('price')
export class PriceController {
    constructor(private readonly priceService: PriceService) {}


    // Route to handle creating prices
  // @Post()
  // async createPrice(@Body() createPriceDto: CreatePriceDto, @Res() res: Response) {
  //   try {
  //     const price = await this.priceService.createPrice(createPriceDto);
  //     return res.status(201).send({ success: true, data: price });
  //   } catch (error) {
  //     return res.status(500).send({ success: false, message: error.message });
  //   }
  // }

  // Route for handling updating price with the unique id
  @Patch(':id')
  async updatePrice(
    @Param('id') id: string,
    @Body() updatePriceDto: UpdatePriceDto,
    @Res() res: Response,
  ) {
    try {
      const updatedPrice = await this.priceService.updatePrice(id, updatePriceDto);
      return res.send({
        success: true,
        data: updatedPrice,
      });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  }

//Route to handle getting all the prices related to a specific event
@Get('event/:id')
async getPrices(
  @Param('id') eventId: string,
  @Res() res: Response,
) {
  try {
    const prices = await this.priceService.getPricesByEventId(eventId);
    return res.send({
      success: true,
      data: prices,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
}

//Route to handle getting a specific price using the unique price id(PK)
@Get(':id')
  async getPrice(
    @Param('id') priceId: string,
    @Res() res: Response,
  ) {
    try {
      const price = await this.priceService.getPriceById(priceId);
      if (price) {
        return res.send({ success: true, data: price });
      } else {
        return res.send({ success: false, message: "No data" });
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  }
}
