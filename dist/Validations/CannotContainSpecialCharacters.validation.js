"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotContainSpecialCharacters = void 0;
const Errors_1 = require("../Errors");
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const CannotContainSpecialCharacters = (value, label, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const replaceList = [
        { tag: '${label}', value: label },
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("CannotContainSpecialCharacters", language, replaceList);
    if (typeof value !== 'string')
        return new Errors_1.InvalidValue(errorMessage);
    let regex = /^[a-zA-Z0-9\s\p{L}]+$/u;
    return regex.test(value) ? null : new Errors_1.InvalidValue(errorMessage);
};
exports.CannotContainSpecialCharacters = CannotContainSpecialCharacters;
