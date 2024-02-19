import { User } from './user.entity';
import { CartDetail } from './cart-det.entity';
export declare class Cart {
    id: number;
    description: string;
    user: User;
    detail: CartDetail[];
}
