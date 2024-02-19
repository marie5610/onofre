import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    create(create: CreateCartDto): Promise<import("./entities/cart.entity").Cart>;
    findAll(): Promise<import("./entities/cart.entity").Cart[]>;
    findOne(id: string): Promise<import("./entities/cart.entity").Cart>;
    update(id: string, update: UpdateCartDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
