"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartDetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const https = require("https");
const uuid_1 = require("uuid");
const cart_det_entity_1 = require("./entities/cart-det.entity");
const cart_entity_1 = require("./entities/cart.entity");
const product_entity_1 = require("../products/entities/product.entity");
let CartDetService = class CartDetService {
    constructor(cartDetRepo, cartRepo, productRepo) {
        this.cartDetRepo = cartDetRepo;
        this.cartRepo = cartRepo;
        this.productRepo = productRepo;
    }
    async create(data) {
        try {
            const cart = await this.cartRepo.findOne({
                where: { id: data.cartId },
            });
            if (!cart) {
                throw new common_1.NotFoundException('No se encontró el carrito');
            }
            const product = await this.productRepo.findOne({
                where: { id: data.roductId },
            });
            if (!product) {
                throw new common_1.NotFoundException('No se encontró el producto');
            }
            const item = new cart_det_entity_1.CartDetail();
            item.cart = cart;
            item.product = product;
            item.quantity = data.quantity;
            return this.cartDetRepo.save(item);
        }
        catch (error) {
            throw new Error(`Error al crear el carrito: ${error.message}`);
        }
    }
    findAll(id) {
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
    async getMonto(id) {
        let totalAmount = 0;
        const cartDetails = await this.findAll(id);
        for (const detail of cartDetails) {
            const amount = detail.quantity * detail.product.price;
            totalAmount += amount;
        }
        const concepto = await this.cartRepo.findOne({ where: { id }, select: { description: true } }).toString();
        return { totalAmount, concepto };
    }
    async createDebt(totalAmount, concepto) {
        return new Promise((resolve, reject) => {
            const idDeuda = (0, uuid_1.v4)();
            const siExiste = 'update';
            const apiKey = 'ap-396bfdb447ecbc17f203a1e3';
            const host = 'staging.adamspay.com';
            const path = '/api/v1/debts';
            const inicio_validez = new Date().toISOString().slice(0, -5) + 'Z';
            const fin_validez = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
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
            const options = {
                hostname: host,
                path: path,
                method: 'POST',
                headers: headers,
            };
            const req = https.request(options, (res) => {
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
                        resolve(debt.payUrl);
                    }
                    else {
                        console.log('# Error');
                        if ('meta' in response) {
                            console.log(JSON.stringify(response.meta, null, 2));
                        }
                        reject(new Error('Error al crear la deuda'));
                    }
                });
            });
            req.on('error', (error) => {
                console.error(error);
                reject(error);
            });
            req.write(payload);
            req.end();
        });
    }
    remove(id) {
        return this.cartDetRepo.delete(id);
    }
};
exports.CartDetService = CartDetService;
exports.CartDetService = CartDetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_det_entity_1.CartDetail)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CartDetService);
//# sourceMappingURL=cart-det.service.js.map