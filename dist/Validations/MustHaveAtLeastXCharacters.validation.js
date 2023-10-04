"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustHaveAtLeastXCharacters = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const MustHaveAtLeastXCharacters = (value, label, charactersNumber, required = true, language = 'en-US') => {
    function validate(value, errorMessage) {
        try {
            if (typeof value !== 'string')
                throw new InvalidValue_error_1.InvalidValue(errorMessage);
            return value?.trim().length < charactersNumber ? new InvalidValue_error_1.InvalidValue(errorMessage) : null;
        }
        catch (e) {
            return new InvalidValue_error_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [
        { tag: '${label}', value: label },
        { tag: '${charactersNumber}', value: charactersNumber.toString() }
    ];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, required, "MustHaveAtLeastXCharacters", language, replaceList);
};
exports.MustHaveAtLeastXCharacters = MustHaveAtLeastXCharacters;
