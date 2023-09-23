"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustBeContainedInEnum = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const MustBeContainedInEnum = (value, label, enumeration, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const enumErrorMessage = (0, Messages_resource_1.getResourceMessageByKey)('enumError', language);
    if (typeof enumeration !== "object")
        return new InvalidValue_error_1.default(enumErrorMessage);
    if (enumeration === null)
        return new InvalidValue_error_1.default(enumErrorMessage);
    const lista = Object.values(enumeration).join();
    const replaceList = [
        { tag: '${label}', value: label },
        { tag: "${JSON.stringify('model')}", value: JSON.stringify('model') },
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)(exports.MustBeContainedInEnum.name, language, replaceList);
    if (typeof value !== 'string')
        return new InvalidValue_error_1.default(errorMessage);
    const resultado = Object.keys(enumeration).some(v => {
        return value?.toLowerCase() === v?.toLowerCase();
    });
    if (!resultado) {
        return new InvalidValue_error_1.default(errorMessage);
    }
    return null;
};
exports.MustBeContainedInEnum = MustBeContainedInEnum;
