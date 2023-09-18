"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustBeContainedInEnum = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const MustBeContainedInEnum = (valor, label, enumeracao, language = 'en-US') => {
    const lista = Object.values(enumeracao).join();
    const errorMessage = language === 'pt-BR' ? `${label}  (${valor}) deve ter estar entre os seguintes valores ${lista}` : `${label}  must be among the following values ${JSON.stringify('model')}.`;
    const resultado = Object.keys(enumeracao).some(v => {
        return valor?.toLowerCase() === v?.toLowerCase();
    });
    if (!resultado) {
        return new InvalidValue_error_1.default(errorMessage);
    }
    return false;
};
exports.MustBeContainedInEnum = MustBeContainedInEnum;
