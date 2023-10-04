"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPositiveInteger = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const IsValidNumber_validation_1 = require("./IsValidNumber.validation");
const ValidationsTools_1 = require("./ValidationsTools");
const IsPositiveInteger = (value, label, required = true, language = 'en-US') => {
    const numberToString = value?.toString() ?? undefined;
    function validate(value, errorMessage) {
        const convertedToNumber = (0, IsValidNumber_validation_1.convertStringToNumber)(value);
        console.log(convertedToNumber);
        if (convertedToNumber instanceof InvalidValue_error_1.InvalidValue)
            return new InvalidValue_error_1.InvalidValue(errorMessage, convertedToNumber);
        const isInteger = Number.isInteger(convertedToNumber);
        console.log(isInteger);
        if (!isInteger)
            return new InvalidValue_error_1.InvalidValue(errorMessage, new InvalidValue_error_1.InvalidValue(`Value '${value}' is not an integer`));
        const isPositive = convertedToNumber >= 0;
        if (!isPositive)
            return new InvalidValue_error_1.InvalidValue(errorMessage, new InvalidValue_error_1.InvalidValue(`Value  '${value}' is not positive`));
        return null;
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, numberToString, label, required, "IsPositiveInteger", language, replaceList);
};
exports.IsPositiveInteger = IsPositiveInteger;
