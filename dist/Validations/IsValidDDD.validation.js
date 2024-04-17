"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeDDD = exports.IsValidDDD = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const IsValidDDD = (value, label, dddList, required = true, language = 'en-US') => {
    function validateDDD(DDD, errorMessage) {
        try {
            const normalizedDDD = normalizeDDD(DDD);
            if (!normalizedDDD) {
                return new InvalidValue_error_1.InvalidValue(errorMessage);
            }
            const ddd = parseInt(normalizedDDD.substring(0, 2));
            if (ddd < 11 || ddd > 98) {
                return new InvalidValue_error_1.InvalidValue(errorMessage);
            }
            for (const [_, ddds] of dddList) {
                if (ddds.includes(ddd)) {
                    return null;
                }
            }
            return new InvalidValue_error_1.InvalidValue(errorMessage);
        }
        catch (err) {
            return new InvalidValue_error_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validateDDD, value, label, required, "IsValidMobilePhoneNumberBR", language, replaceList);
};
exports.IsValidDDD = IsValidDDD;
function normalizeDDD(DDD) {
    const normalized = DDD.replace(/\D/g, '');
    if (normalized.length < 2) {
        return null;
    }
    if (normalized.length > 2) {
        return null;
    }
    if (!/^[1-9]{2}$/.test(normalized)) {
        return null;
    }
    return normalized;
}
exports.normalizeDDD = normalizeDDD;
