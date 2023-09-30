"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotBeBlank = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const CannotBeBlank = (value, label, required = true, language = 'en-US') => {
    function validate(value, errorMessage) {
        try {
            if (typeof value !== 'string')
                throw new InvalidValue_error_1.InvalidValue(errorMessage);
            return required && (value == undefined || value.length === 0 || value?.trim() === '') ? new InvalidValue_error_1.InvalidValue(errorMessage) : null;
        }
        catch (e) {
            return new InvalidValue_error_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, "CannotBeBlank", language, replaceList);
};
exports.CannotBeBlank = CannotBeBlank;
