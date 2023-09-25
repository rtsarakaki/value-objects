"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotStartWithZero = void 0;
const Errors_1 = require("../Errors");
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const CannotStartWithZero = (value, label, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const replaceList = [
        { tag: '${label}', value: label },
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("CannotStartWithZero", language, replaceList);
    if (typeof value !== 'string')
        return new Errors_1.InvalidValue(errorMessage);
    return value.trim()[0] === '0' ? new Errors_1.InvalidValue(errorMessage) : null;
};
exports.CannotStartWithZero = CannotStartWithZero;
