"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotHaveSpecialCharacters = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const CannotHaveSpecialCharacters = (valor, label, language = 'en-US') => {
    const errorMessage = language === 'pt-BR' ? `${label}  não pode ter caracteres especiais.` : `${label}  cannot have special characters.`;
    let regex = /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{0,}$/;
    return regex.test(valor) ? new InvalidValue_error_1.default(errorMessage) : null;
};
exports.CannotHaveSpecialCharacters = CannotHaveSpecialCharacters;
