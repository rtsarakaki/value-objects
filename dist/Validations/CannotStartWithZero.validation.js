"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotStartWithZero = void 0;
const Errors_1 = require("../Errors");
const ValidationsTools_1 = require("./ValidationsTools");
const CannotStartWithZero = (value, label, required = true, language = 'en-US') => {
    function validate(value, errorMessage) {
        if (typeof value !== 'string')
            return new Errors_1.InvalidValue(errorMessage);
        return value.trim()[0] === '0' ? new Errors_1.InvalidValue(errorMessage) : null;
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, required, "CannotStartWithZero", language, replaceList);
};
exports.CannotStartWithZero = CannotStartWithZero;
