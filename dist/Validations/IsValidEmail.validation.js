"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidEmail = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const IsValidEmail = (value, label, required = true, language = 'en-US') => {
    function validateEmail(email, errorMessage) {
        try {
            if (typeof email !== 'string')
                return new InvalidValue_error_1.InvalidValue(errorMessage);
            const result = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email) && !/^[.-]|[-.]$|([.-]{2,})/i.test(email) ? null : new InvalidValue_error_1.InvalidValue(errorMessage);
            return result;
        }
        catch (err) {
            console.log('error', err);
            return new InvalidValue_error_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validateEmail, value, label, required, "IsValidEmail", language, replaceList);
};
exports.IsValidEmail = IsValidEmail;
