/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { CartDetail } from './cart-det.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartDetail, (detail) => detail.cart)
  @JoinColumn()
  detail: CartDetail[];
}