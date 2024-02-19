import { Cart } from './cart.entity';
export declare class User {
    id: number;
    role: string;
    name: string;
    lastName: string;
    documentNumber: number;
    phone: number;
    email: string;
    address: string;
    cart: Cart[];
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
