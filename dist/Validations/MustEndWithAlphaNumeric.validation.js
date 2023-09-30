"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustEndWithAlphaNumeric = void 0;
const Errors_1 = require("../Errors");
const ValidationsTools_1 = require("./ValidationsTools");
const MustEndWithAlphaNumeric = (value, label, language = 'en-US') => {
    function validate(value, errorMessage) {
        if (value === undefined || value === null || typeof value !== 'string') {
            return new Errors_1.InvalidValue(errorMessage);
        }
        const trimmedValue = value.trim();
        if (trimmedValue.length === 0) {
            return new Errors_1.InvalidValue(errorMessage);
        }
        const lastChar = trimmedValue[trimmedValue.length - 1];
        if (!lastChar.match(/^[a-zA-Z0-9]+$/)) {
            return new Errors_1.InvalidValue(errorMessage);
        }
        return null;
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, "MustEndWithAlphaNumeric", language, replaceList);
};
exports.MustEndWithAlphaNumeric = MustEndWithAlphaNumeric;
