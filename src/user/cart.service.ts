/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>) {}

  create(create: CreateCartDto) {
    const newCart = this.cartRepo.create(create);
    return this.cartRepo.save(newCart);
  }

  findAll() {
    return this.cartRepo.find();
  }

  findOne(id: number) {
    return this.cartRepo.findOne({ where: { id } });
  }

  update(id: number, update: UpdateCartDto) {
    return this.cartRepo.update(id, update);
  }

  remove(id: number) {
    return this.cartRepo.delete(id);
  }
}
