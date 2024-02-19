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
exports.HookController = void 0;
const common_1 = require("@nestjs/common");
const md5 = require("md5");
let HookController = class HookController {
    handleWebhook(payload, hash) {
        const secret = '3e4a5dc7f96f26a72d73a37ff0ccd5f8';
        const expectedHash = md5('adams' + JSON.stringify(payload) + secret);
        if (expectedHash !== hash) {
            throw new common_1.HttpException('Validación ha fallado', common_1.HttpStatus.FORBIDDEN);
        }
        console.log(payload);
        return payload;
    }
};
exports.HookController = HookController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-adams-notify-hash')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HookController.prototype, "handleWebhook", null);
exports.HookController = HookController = __decorate([
    (0, common_1.Controller)('hook')
], HookController);
//# sourceMappingURL=hook.controller.js.map