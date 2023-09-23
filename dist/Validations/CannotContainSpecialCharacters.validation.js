"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotContainSpecialCharacters = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const CannotContainSpecialCharacters = (value, label, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const replaceList = [
        { tag: '${label}', value: label },
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)(exports.CannotContainSpecialCharacters.name, language, replaceList);
    if (typeof value !== 'string')
        return new InvalidValue_error_1.default(errorMessage);
    let regex = /^[a-zA-Z0-9\s\p{L}]+$/u;
    return regex.test(value) ? null : new InvalidValue_error_1.default(errorMessage);
};
exports.CannotContainSpecialCharacters = CannotContainSpecialCharacters;
