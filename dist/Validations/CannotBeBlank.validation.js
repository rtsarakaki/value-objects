"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotBeBlank = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const CannotBeBlank = (value, label, required = true, language = 'en-US') => {
    const errorMessage = language === 'pt-BR' ? `${label} não pode estar em branco.` : `${label} cannot be blank.`;
    try {
        return required && (value == undefined || value.length === 0 || value?.trim() === '') ? new InvalidValue_error_1.default(errorMessage) : null;
    }
    catch (e) {
        return new InvalidValue_error_1.default(errorMessage);
    }
};
exports.CannotBeBlank = CannotBeBlank;
