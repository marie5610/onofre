export declare class CreateCartDto {
    description: string;
    userId: number;
}
declare const UpdateCartDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCartDto>>;
export declare class UpdateCartDto extends UpdateCartDto_base {
}
export {};
