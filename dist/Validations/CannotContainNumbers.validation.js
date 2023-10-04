"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotContainNumbers = void 0;
const Errors_1 = require("../Errors");
const ValidationsTools_1 = require("./ValidationsTools");
const CannotContainNumbers = (value, label, required = true, language = 'en-US') => {
    function validate(value, errorMessage) {
        const regex = /\d/;
        return regex.test(value) ? new Errors_1.InvalidValue(errorMessage) : null;
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, required, "CannotContainNumbers", language, replaceList);
};
exports.CannotContainNumbers = CannotContainNumbers;
