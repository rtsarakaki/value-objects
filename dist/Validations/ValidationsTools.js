"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationAcceleratorSuggestion = exports.validateLabel = void 0;
const Errors_1 = require("../Errors");
const Messages_resource_1 = require("../Resources/Messages.resource");
function validateLabel(value, language = 'en-US') {
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("validateLabel", language);
    if (typeof value !== 'string')
        return new Errors_1.InvalidValue(errorMessage);
    if (value.trim() === '')
        return new Errors_1.InvalidValue(errorMessage);
    return null;
}
exports.validateLabel = validateLabel;
function validationAcceleratorSuggestion(validationCallback, value, label, required = false, messageKey, language, replaceList) {
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)(messageKey, language, replaceList);
    const labelValidation = validateLabel(label);
    if (labelValidation !== null)
        return labelValidation;
    if (typeof value !== 'string')
        return new Errors_1.InvalidValue(errorMessage);
    const valueUndefinedNullOrEmpty = (value === null || value === undefined || value.length === 0 || value?.trim() === '');
    const mustValidate = required || !valueUndefinedNullOrEmpty;
    if (!mustValidate)
        return null;
    return validationCallback(value, errorMessage);
}
exports.validationAcceleratorSuggestion = validationAcceleratorSuggestion;
