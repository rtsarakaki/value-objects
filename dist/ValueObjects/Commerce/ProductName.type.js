"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductName = exports.ProductName = void 0;
const Title_type_1 = require("../StringLiteral/Title.type");
class ProductName extends Title_type_1.Title {
    constructor(value, label, required, language, ...customValidators) {
        super(value, label ?? 'ProductName', required ?? true, language ?? 'en-US', ...customValidators);
    }
}
exports.ProductName = ProductName;
function createProductName(value, label, required, language, ...customValidators) {
    return new ProductName(value, label, required, language, ...customValidators);
}
exports.createProductName = createProductName;
