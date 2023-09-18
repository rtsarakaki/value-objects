"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotStartWithZero = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const CannotStartWithZero = (valor, label, language = 'en-US') => {
    const errorMessage = language === 'pt-BR' ? `${label} não pode começar com zero.` : `${label} cannot start with zero.`;
    return valor[0] === '0' ? new InvalidValue_error_1.default(errorMessage) : null;
};
exports.CannotStartWithZero = CannotStartWithZero;
