"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidEmail = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const IsValidEmail = (valor, label, language = 'en-US') => {
    const errorMessage = language === 'pt-BR' ? `${label}  deve ser um e-mail valido.` : `${label}  must be a valid e-mail.`;
    function validateEmail(email) {
        try {
            return /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);
        }
        catch (err) {
            return false;
        }
    }
    return !validateEmail(valor) ? new InvalidValue_error_1.default(errorMessage) : null;
};
exports.IsValidEmail = IsValidEmail;
