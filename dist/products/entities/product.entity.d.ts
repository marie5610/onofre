import { CartDetail } from 'src/user/entities/cart-det.entity';
export declare class Product {
    id: number;
    name: string;
    code: string;
    price: number;
    description: string;
    size: string;
    flavor: string;
    imgUrl: string;
    cart: CartDetail[];
    createdAt: Date;
    updatedAt: Date;
}
