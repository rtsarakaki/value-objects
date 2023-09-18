"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustContainOnlyNumbers = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const MustContainOnlyNumbers = (valor, label, language = 'en-US') => {
    const errorMessage = language === 'pt-BR' ? `${label}  deve conter apenas números.` : `${label} must contain only numbers.`;
    return isNaN(Number(valor))
        ? new InvalidValue_error_1.default(errorMessage)
        : null;
};
exports.MustContainOnlyNumbers = MustContainOnlyNumbers;
