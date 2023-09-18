"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidUrl = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const IsValidUrl = (valor, label, language = 'en-US') => {
    const errorMessage = language === 'pt-BR' ? `${label}  deve ser uma URL valida.` : `${label}  must be a valid URL.`;
    function validateUrl(url) {
        try {
            const endpoint = url?.indexOf('http') !== -1 ? url : 'http://' + url;
            new URL(endpoint);
            return /^(ftp|http|https):\/\/[^ "]+$/.test(endpoint);
        }
        catch (err) {
            return false;
        }
    }
    return !validateUrl(valor) ? new InvalidValue_error_1.default(errorMessage) : null;
};
exports.IsValidUrl = IsValidUrl;
