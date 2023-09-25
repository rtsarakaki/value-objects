"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotContainNumbers = void 0;
const Errors_1 = require("../Errors");
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const CannotContainNumbers = (value, label, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const replaceList = [
        { tag: '${label}', value: label },
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("CannotContainNumbers", language, replaceList);
    if (typeof value !== 'string')
        return new Errors_1.InvalidValue(errorMessage);
    const regex = /\d/;
    return regex.test(value)
        ? new Errors_1.InvalidValue(errorMessage)
        : null;
};
exports.CannotContainNumbers = CannotContainNumbers;
