"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidUrl = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const IsValidUrl = (value, label, language = 'en-US') => {
    function validateUrl(url, errorMessage) {
        try {
            if (typeof url !== 'string')
                return new InvalidValue_error_1.InvalidValue(errorMessage);
            new URL(url);
            return null;
        }
        catch (err) {
            return new InvalidValue_error_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validateUrl, value, label, "IsValidUrl", language, replaceList);
};
exports.IsValidUrl = IsValidUrl;
