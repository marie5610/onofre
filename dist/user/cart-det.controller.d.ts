import { Response } from 'express';
import { CartDetService } from './cart-det.service';
import { CreateCartDet } from './dto/cart-det.dto';
export declare class CartDetController {
    private readonly service;
    constructor(service: CartDetService);
    create(create: CreateCartDet): Promise<import("./entities/cart-det.entity").CartDetail>;
    findAll(id: string): Promise<import("./entities/cart-det.entity").CartDetail[]>;
    debt(id: number, res: Response): Promise<string>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
