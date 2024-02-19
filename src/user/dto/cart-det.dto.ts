/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";

export class CreateCartDet {
  cartId: number;
  quantity: number;
  roductId: number;
}
export class UpdateCartDetDto extends PartialType(CreateCartDet) {}