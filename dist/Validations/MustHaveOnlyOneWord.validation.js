"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustHaveOnlyOneWord = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const MustHaveOnlyOneWord = (valor, label, language = 'en-US') => {
    const errorMessage = language === 'pt-BR' ? `${label}  não pode conter espaços.` : `${label}  cannot contain spaces.`;
    try {
        return valor?.trim().indexOf(' ') != -1 ? new InvalidValue_error_1.default(errorMessage) : null;
    }
    catch (e) {
        return new InvalidValue_error_1.default(errorMessage);
    }
};
exports.MustHaveOnlyOneWord = MustHaveOnlyOneWord;
