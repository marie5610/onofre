export declare class CreateCartDet {
    cartId: number;
    quantity: number;
    roductId: number;
}
declare const UpdateCartDetDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCartDet>>;
export declare class UpdateCartDetDto extends UpdateCartDetDto_base {
}
export {};
