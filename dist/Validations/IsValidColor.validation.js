"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidColor = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const IsValidColor = (valor, label, language = 'en-US') => {
    const errorMessage = language === 'pt-BR' ? `${label}  deve ser uma cor valida.` : `${label}  must be a valid color.`;
    function validateColor(cor) {
        try {
            return CSS.supports('color', cor);
        }
        catch (e) {
            return false;
        }
    }
    return !validateColor(valor) ? new InvalidValue_error_1.default(errorMessage) : null;
};
exports.IsValidColor = IsValidColor;
