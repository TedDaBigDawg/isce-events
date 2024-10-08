// import { Controller, Get, Query, Res } from '@nestjs/common';
// import { CardService } from './card.service';
// import { Response } from 'express';

// @Controller('card')
// export class CardController {
//     constructor(private readonly cardService: CardService) {}

//   @Get('card-get')
//   async cardGetEvents(@Query('page') page: number, @Query('limit') limit: number, @Query('id') id: string, @Query('type') type: string, @Res() res: Response) {
//     try {
//       const result = await this.cardService.getCardEvents(page, limit, id, type);
//       return res.status(200).send(result);
//     } catch (error) {
//       return res.status(500).send({
//         success: 'false',
//         message: error.message,
//       });
//     }
//   }
// }
