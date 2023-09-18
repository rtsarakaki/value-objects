"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustHaveTheSameStructureThan = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
function MustHaveTheSameStructureThan(valor, label, language = 'en-US') {
    const errorMessage = language === 'pt-BR' ? `${label}  deve ter a mesma estrutura que ${JSON.stringify('model')}.` : `${label}  must have the same structure than ${JSON.stringify('model')}.`;
    try {
        const resultado = JSON.parse(valor);
        const model = resultado;
        return model;
    }
    catch (e) {
        return new InvalidValue_error_1.default(errorMessage);
    }
}
exports.MustHaveTheSameStructureThan = MustHaveTheSameStructureThan;
