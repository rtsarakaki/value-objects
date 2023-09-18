"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GenericError_error_1 = __importDefault(require("./GenericError.error"));
class InvalidValue extends GenericError_error_1.default {
    constructor(msg, erros = null) {
        super(msg, erros);
        Object.setPrototypeOf(this, InvalidValue.prototype);
    }
}
exports.default = InvalidValue;
