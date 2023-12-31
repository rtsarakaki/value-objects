"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotBeBlank = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const CannotBeBlank = (value, label, required = true, language = 'en-US') => {
    if (!required)
        return null;
    const handledString = value?.toString() ?? '';
    const replaceList = [{ tag: '${label}', value: label }];
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)("CannotBeBlank", language, replaceList);
    const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
    if (labelValidation !== null)
        return labelValidation;
    const valueUndefinedNullOrEmpty = (value === null || value === undefined || handledString.length === 0 || handledString?.trim() === '');
    return valueUndefinedNullOrEmpty ? new InvalidValue_error_1.InvalidValue(errorMessage) : null;
};
exports.CannotBeBlank = CannotBeBlank;
