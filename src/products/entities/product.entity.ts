/* eslint-disable prettier/prettier */
import { CartDetail } from 'src/user/entities/cart-det.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  code: string;

  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  size: string;

  @Column({ type: 'varchar', nullable: true })
  flavor: string;

  @Column({ type: 'varchar', nullable: true })
  imgUrl: string;

  @OneToMany(() => CartDetail, (cart) => cart.product)
  cart: CartDetail[];


  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
