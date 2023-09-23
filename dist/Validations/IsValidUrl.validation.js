"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidUrl = void 0;
const InvalidValue_error_1 = __importDefault(require("../Errors/InvalidValue.error"));
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const IsValidUrl = (valor, label, language = 'en-US') => {
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const replaceList = [
        { tag: '${label}', value: label },
    ];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)(exports.IsValidUrl.name, language, replaceList);
    function validateUrl(url) {
        try {
            if (typeof url !== 'string')
                throw new InvalidValue_error_1.default(errorMessage);
            new URL(url);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    return !validateUrl(valor) ? new InvalidValue_error_1.default(errorMessage) : null;
};
exports.IsValidUrl = IsValidUrl;
