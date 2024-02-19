/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';

export class CreateCartDto {
  description: string;
  userId: number;
}

export class UpdateCartDto extends PartialType(CreateCartDto) {}
