"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotHaveMoreThanXCharacters = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const CannotHaveMoreThanXCharacters = (value, label, charactersNumber, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const replaceList = [
        { tag: '${label}', value: label },
        { tag: '${charactersNumber}', value: charactersNumber.toString() }
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("CannotHaveMoreThanXCharacters", language, replaceList);
    try {
        if (typeof value !== 'string')
            throw new InvalidValue_error_1.default(errorMessage);
        return value?.trim().length > charactersNumber ? new InvalidValue_error_1.default(errorMessage) : null;
    }
    catch (e) {
        return new InvalidValue_error_1.default(errorMessage);
    }
};
exports.CannotHaveMoreThanXCharacters = CannotHaveMoreThanXCharacters;
