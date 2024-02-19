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
exports.CartDetController = void 0;
const common_1 = require("@nestjs/common");
const cart_det_service_1 = require("./cart-det.service");
const cart_det_dto_1 = require("./dto/cart-det.dto");
let CartDetController = class CartDetController {
    constructor(service) {
        this.service = service;
    }
    create(create) {
        return this.service.create(create);
    }
    findAll(id) {
        return this.service.findAll(+id);
    }
    async debt(id, res) {
        const AmountConcept = await this.service.getMonto(id);
        const payUrl = await this.service.createDebt(AmountConcept.totalAmount, AmountConcept.concepto);
        res.redirect(302, payUrl);
        return this.service.createDebt(AmountConcept.totalAmount, AmountConcept.concepto);
    }
    remove(id) {
        return this.service.remove(+id);
    }
};
exports.CartDetController = CartDetController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_det_dto_1.CreateCartDet]),
    __metadata("design:returntype", void 0)
], CartDetController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartDetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('debt/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CartDetController.prototype, "debt", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartDetController.prototype, "remove", null);
exports.CartDetController = CartDetController = __decorate([
    (0, common_1.Controller)('cart-det'),
    __metadata("design:paramtypes", [cart_det_service_1.CartDetService])
], CartDetController);
//# sourceMappingURL=cart-det.controller.js.map