"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustStartWithAlphaNumeric = void 0;
const Errors_1 = require("../Errors");
const ValidationsTools_1 = require("./ValidationsTools");
const MustStartWithAlphaNumeric = (value, label, language = 'en-US') => {
    function validate(value, errorMessage) {
        if (value === undefined || value === null || typeof value !== 'string') {
            return new Errors_1.InvalidValue(errorMessage);
        }
        const trimmedValue = value.trim();
        if (trimmedValue.length === 0) {
            return new Errors_1.InvalidValue(errorMessage);
        }
        const firstChar = trimmedValue[0];
        if (!firstChar.match(/^[a-zA-Z0-9]+$/)) {
            return new Errors_1.InvalidValue(errorMessage);
        }
        return null;
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, "MustStartWithAlphaNumeric", language, replaceList);
};
exports.MustStartWithAlphaNumeric = MustStartWithAlphaNumeric;
