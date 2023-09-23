"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidValue = void 0;
const GenericError_error_1 = require("./GenericError.error");
class InvalidValue extends GenericError_error_1.GenericError {
    constructor(message, erros = null) {
        super(message, erros);
        Object.setPrototypeOf(this, InvalidValue.prototype);
    }
}
exports.InvalidValue = InvalidValue;
