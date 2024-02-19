"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCartDto = exports.CreateCartDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
class CreateCartDto {
}
exports.CreateCartDto = CreateCartDto;
class UpdateCartDto extends (0, mapped_types_1.PartialType)(CreateCartDto) {
}
exports.UpdateCartDto = UpdateCartDto;
//# sourceMappingURL=cart.dto.js.map