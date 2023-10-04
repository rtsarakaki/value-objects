"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustContainOnlyNumbers = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const MustContainOnlyNumbers = (value, label, required = true, language = 'en-US') => {
    function validate(value, errorMessage) {
        if (typeof value !== 'string')
            return new InvalidValue_error_1.InvalidValue(errorMessage);
        return isNaN(Number(value))
            ? new InvalidValue_error_1.InvalidValue(errorMessage)
            : null;
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, required, "MustContainOnlyNumbers", language, replaceList);
};
exports.MustContainOnlyNumbers = MustContainOnlyNumbers;
