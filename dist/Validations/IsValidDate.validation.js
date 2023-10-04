"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidDate = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const IsValidDate = (value, label, required = true, language = 'en-US') => {
    function dateValidation(date, errorMessage) {
        try {
            if (typeof date !== 'string')
                return new InvalidValue_error_1.InvalidValue(errorMessage);
            const dateObj = new Date(date.trim());
            const isValid = dateObj.toString() !== 'Invalid Date';
            return isValid ? null : new InvalidValue_error_1.InvalidValue(errorMessage);
        }
        catch (err) {
            return new InvalidValue_error_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [
        { tag: '${label}', value: label },
        { tag: '${value}', value: value },
    ];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(dateValidation, value, label, required, "IsValidDate", language, replaceList);
};
exports.IsValidDate = IsValidDate;
