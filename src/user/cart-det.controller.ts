/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CartDetService } from './cart-det.service';
import { CreateCartDet } from './dto/cart-det.dto';

@Controller('cart-det')
export class CartDetController {
  constructor(private readonly service: CartDetService) {}

  @Post()
  create(@Body() create: CreateCartDet) {
    return this.service.create(create);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.service.findAll(+id);
  }

  @Post('debt/:id')
  async debt(@Param('id') id: number, @Res() res: Response) {
    const AmountConcept = await this.service.getMonto(id);
    const payUrl = await this.service.createDebt(AmountConcept.totalAmount, AmountConcept.concepto);
    res.redirect(302, payUrl);
    return this.service.createDebt(AmountConcept.totalAmount, AmountConcept.concepto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
