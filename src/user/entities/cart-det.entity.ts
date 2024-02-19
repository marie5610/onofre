/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class CartDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.detail)
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cart)
  @JoinColumn()
  product: Product;

  @Column({ type: 'int' })
  quantity: number;
}