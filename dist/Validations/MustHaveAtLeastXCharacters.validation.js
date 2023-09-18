"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustHaveAtLeastXCharacters = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const MustHaveAtLeastXCharacters = (value, label, charactersNumber, language = 'en-US') => {
    const errorMessage = language === 'pt-BR' ? `${label}  deve ter pelo menos ${charactersNumber} caracteres.` : `${label} must have at least  ${charactersNumber}  characters.`;
    try {
        return value?.trim().length < charactersNumber ? new InvalidValue_error_1.default(errorMessage) : null;
    }
    catch (e) {
        return new InvalidValue_error_1.default(errorMessage);
    }
};
exports.MustHaveAtLeastXCharacters = MustHaveAtLeastXCharacters;
