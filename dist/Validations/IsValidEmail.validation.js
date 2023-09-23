"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidEmail = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const IsValidEmail = (valor, label, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const replaceList = [
        { tag: '${label}', value: label },
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)(exports.IsValidEmail.name, language, replaceList);
    function validateEmail(email) {
        try {
            if (typeof email !== 'string')
                throw new InvalidValue_error_1.default(errorMessage);
            return /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);
        }
        catch (err) {
            return false;
        }
    }
    return !validateEmail(valor) ? new InvalidValue_error_1.default(errorMessage) : null;
};
exports.IsValidEmail = IsValidEmail;
