/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { CartDetController } from './cart-det.controller';
import { CartDetService } from './cart-det.service';
import { CartDetail } from './entities/cart-det.entity';
import { ProductsModule } from 'src/products/products.module';
import { HookController } from './hook.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, CartDetail]), ProductsModule],
  controllers: [UserController, CartController, CartDetController, HookController],
  providers: [UserService, CartService, CartDetService],
})
export class UserModule {}
