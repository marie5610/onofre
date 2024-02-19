export declare class CreateDebtDto {
    monto: number;
    concepto: string;
}
declare const UpdateDebtDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDebtDto>>;
export declare class UpdateDebtDto extends UpdateDebtDto_base {
}
export {};
