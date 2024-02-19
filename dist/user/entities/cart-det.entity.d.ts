import { Cart } from './cart.entity';
import { Product } from 'src/products/entities/product.entity';
export declare class CartDetail {
    id: number;
    cart: Cart;
    product: Product;
    quantity: number;
}
