"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustContainOnlyNumbers = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const MustContainOnlyNumbers = (value, label, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const replaceList = [
        { tag: '${label}', value: label },
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)(exports.MustContainOnlyNumbers.name, language, replaceList);
    if (typeof value !== 'string')
        return new InvalidValue_error_1.default(errorMessage);
    return isNaN(Number(value))
        ? new InvalidValue_error_1.default(errorMessage)
        : null;
};
exports.MustContainOnlyNumbers = MustContainOnlyNumbers;
