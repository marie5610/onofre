/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  Headers,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import * as md5 from 'md5';

@Controller('hook')
export class HookController {
  @Post()
  @HttpCode(200)
  handleWebhook(
    @Body() payload: any,
    @Headers('x-adams-notify-hash') hash: string,
  ) {
    const secret = '3e4a5dc7f96f26a72d73a37ff0ccd5f8';
    const expectedHash = md5('adams' + JSON.stringify(payload) + secret);
    if (expectedHash !== hash) {
      throw new HttpException('Validación ha fallado', HttpStatus.FORBIDDEN);
    }
    console.log(payload);
    return payload;
  }
}
