"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotHaveMoreThanXCharacters = void 0;
const Errors_1 = require("../Errors");
const ValidationsTools_1 = require("./ValidationsTools");
const CannotHaveMoreThanXCharacters = (value, label, charactersNumber, language = 'en-US') => {
    function validate(value, errorMessage) {
        try {
            if (typeof value !== 'string')
                throw new Errors_1.InvalidValue(errorMessage);
            return value?.trim().length > charactersNumber ? new Errors_1.InvalidValue(errorMessage) : null;
        }
        catch (e) {
            return new Errors_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [
        { tag: '${label}', value: label },
        { tag: '${charactersNumber}', value: charactersNumber.toString() }
    ];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, "CannotHaveMoreThanXCharacters", language, replaceList);
};
exports.CannotHaveMoreThanXCharacters = CannotHaveMoreThanXCharacters;
