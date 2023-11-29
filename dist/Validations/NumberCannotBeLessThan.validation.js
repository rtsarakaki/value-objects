"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberCannotBeLessThan = void 0;
const Errors_1 = require("../Errors");
const ValidationsTools_1 = require("./ValidationsTools");
const NumberCannotBeLessThan = (value, label, minNumber, required = true, language = 'en-US') => {
    function validate(value, errorMessage) {
        const numValue = parseFloat(value);
        try {
            if (isNaN(numValue))
                throw new Errors_1.InvalidValue(errorMessage);
            return numValue < minNumber ? new Errors_1.InvalidValue(errorMessage) : null;
        }
        catch (e) {
            return new Errors_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [
        { tag: '${label}', value: label },
        { tag: '${minNumber}', value: minNumber.toString() }
    ];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, required, "NumberCannotBeLessThan", language, replaceList);
};
exports.NumberCannotBeLessThan = NumberCannotBeLessThan;
