"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustHaveAtLeastXLetters = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const MustHaveAtLeastXLetters = (value, label, lettersNumber, required = true, language = 'en-US') => {
    function validate(value, errorMessage) {
        try {
            if (typeof value !== 'string')
                throw new InvalidValue_error_1.InvalidValue(errorMessage);
            const letterCount = (value.match(/[a-zA-Z]/g) || []).length;
            return letterCount < lettersNumber ? new InvalidValue_error_1.InvalidValue(errorMessage) : null;
        }
        catch (e) {
            return new InvalidValue_error_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [
        { tag: '${label}', value: label },
        { tag: '${lettersNumber}', value: lettersNumber.toString() }
    ];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, required, "MustHaveAtLeastXLetters", language, replaceList);
};
exports.MustHaveAtLeastXLetters = MustHaveAtLeastXLetters;
