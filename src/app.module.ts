/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Product } from './products/entities/product.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Cart } from './user/entities/cart.entity';
import { CartDetail } from './user/entities/cart-det.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'marie',
      password: '56103pBbwj*',
      database: 'dnofre',
      entities: [Product, User, Cart, CartDetail],
      synchronize: true,
    }),
    ProductsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
