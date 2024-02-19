"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const cart_service_1 = require("./cart.service");
const cart_controller_1 = require("./cart.controller");
const cart_entity_1 = require("./entities/cart.entity");
const cart_det_controller_1 = require("./cart-det.controller");
const cart_det_service_1 = require("./cart-det.service");
const cart_det_entity_1 = require("./entities/cart-det.entity");
const products_module_1 = require("../products/products.module");
const hook_controller_1 = require("./hook.controller");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, cart_entity_1.Cart, cart_det_entity_1.CartDetail]), products_module_1.ProductsModule],
        controllers: [user_controller_1.UserController, cart_controller_1.CartController, cart_det_controller_1.CartDetController, hook_controller_1.HookController],
        providers: [user_service_1.UserService, cart_service_1.CartService, cart_det_service_1.CartDetService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map