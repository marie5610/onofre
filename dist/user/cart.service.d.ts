import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';
export declare class CartService {
    private cartRepo;
    constructor(cartRepo: Repository<Cart>);
    create(create: CreateCartDto): Promise<Cart>;
    findAll(): Promise<Cart[]>;
    findOne(id: number): Promise<Cart>;
    update(id: number, update: UpdateCartDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
