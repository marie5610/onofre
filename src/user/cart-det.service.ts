/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as http from 'http';
import * as https from 'https';
import { v4 as uuidv4 } from 'uuid';

import { CartDetail } from './entities/cart-det.entity';
import { CreateCartDet } from './dto/cart-det.dto';
import { Cart } from './entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CartDetService {
  constructor(
    @InjectRepository(CartDetail) private cartDetRepo: Repository<CartDetail>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(data: CreateCartDet) {
    try {
      const cart = await this.cartRepo.findOne({
        where: { id: data.cartId },
      });
      if (!cart) {
        throw new NotFoundException('No se encontró el carrito');
      }
      const product = await this.productRepo.findOne({
        where: { id: data.roductId },
      });
      if (!product) {
        throw new NotFoundException('No se encontró el producto');
      }
      const item = new CartDetail();
      item.cart = cart;
      item.product = product;
      item.quantity = data.quantity;
      return this.cartDetRepo.save(item);
    } catch (error) {
      throw new Error(`Error al crear el carrito: ${error.message}`);
    }
  }

  findAll(id: number) {
    return this.cartDetRepo.find({
      where: { cart: { id } },
      relations: { product: true },
      select: {
        product: {
          description: true,
          size: true,
          flavor: true,
          price: true,
        },
        quantity: true,
      },
    });
  }

  async getMonto(id: number) {
    let totalAmount = 0;
    const cartDetails = await this.findAll(id);
    for (const detail of cartDetails) {
      const amount = detail.quantity * detail.product.price;
      totalAmount += amount;
    }
    const concepto = await this.cartRepo.findOne({where: {id}, select: {description: true}}).toString();
    return {totalAmount, concepto};
  }

  async createDebt(totalAmount: number, concepto: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const idDeuda: string = uuidv4();
      const siExiste: string = 'update';
      const apiKey: string = 'ap-396bfdb447ecbc17f203a1e3';
      const host: string = 'staging.adamspay.com';
      const path: string = '/api/v1/debts';
      const inicio_validez: string =
        new Date().toISOString().slice(0, -5) + 'Z';
      const fin_validez: string =
        new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, -5) + 'Z';
      const deuda = {
        docId: idDeuda,
        amount: { currency: 'PYG', value: totalAmount },
        label: concepto,
        validPeriod: {
          start: inicio_validez,
          end: fin_validez,
        },
      };
      const post = { debt: deuda };
      const payload = JSON.stringify(post);
      const headers = {
        apikey: apiKey,
        'Content-Type': 'application/json',
        'x-if-exists': siExiste,
      };
      const options: https.RequestOptions = {
        hostname: host,
        path: path,
        method: 'POST',
        headers: headers,
      };
      const req = https.request(options, (res: http.IncomingMessage) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const response = JSON.parse(data);
          if ('debt' in response) {
            const debt = response.debt;
            console.log('Deuda creada exitosamente');
            console.log('URL=' + debt.payUrl);
            resolve(debt.payUrl); // Resuelve la promesa con la URL de pago
          } else {
            console.log('# Error');
            if ('meta' in response) {
              console.log(JSON.stringify(response.meta, null, 2));
            }
            reject(new Error('Error al crear la deuda')); // Rechaza la promesa en caso de error
          }
        });
      });
      req.on('error', (error) => {
        console.error(error);
        reject(error); // Rechaza la promesa en caso de error de la solicitud
      });
      req.write(payload);
      req.end();
    });
  }

  remove(id: number) {
    return this.cartDetRepo.delete(id);
  }
}
