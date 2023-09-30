"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotContainSpecialCharacters = void 0;
const Errors_1 = require("../Errors");
const ValidationsTools_1 = require("./ValidationsTools");
const CannotContainSpecialCharacters = (value, label, language = 'en-US') => {
    function validate(value, errorMessage) {
        if (typeof value !== 'string')
            return new Errors_1.InvalidValue(errorMessage);
        let regex = /^[a-zA-Z0-9\s\p{L}]+$/u;
        return regex.test(value) ? null : new Errors_1.InvalidValue(errorMessage);
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, "CannotContainSpecialCharacters", language, replaceList);
};
exports.CannotContainSpecialCharacters = CannotContainSpecialCharacters;
