/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";

export class CreateDebtDto {
  monto: number;
  concepto: string;
}

export class UpdateDebtDto extends PartialType(CreateDebtDto) {}
