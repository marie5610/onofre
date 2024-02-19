import { Repository } from 'typeorm';
import { CartDetail } from './entities/cart-det.entity';
import { CreateCartDet } from './dto/cart-det.dto';
import { Cart } from './entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';
export declare class CartDetService {
    private cartDetRepo;
    private cartRepo;
    private productRepo;
    constructor(cartDetRepo: Repository<CartDetail>, cartRepo: Repository<Cart>, productRepo: Repository<Product>);
    create(data: CreateCartDet): Promise<CartDetail>;
    findAll(id: number): Promise<CartDetail[]>;
    getMonto(id: number): Promise<{
        totalAmount: number;
        concepto: string;
    }>;
    createDebt(totalAmount: number, concepto: string): Promise<string>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
