"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotRepeatCharInSequenceFourTimes = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const CannotRepeatCharInSequenceFourTimes = (value, label, required = true, language = 'en-US') => {
    function validate(value, errorMessage) {
        try {
            const strValue = String(value);
            const regex = /(.)\1{3,}/;
            return regex.test(strValue) ? new InvalidValue_error_1.InvalidValue(errorMessage) : null;
        }
        catch (e) {
            return new InvalidValue_error_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [
        { tag: '${label}', value: label }
    ];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, required, "CannotRepeatCharInSequenceFourTimes", language, replaceList);
};
exports.CannotRepeatCharInSequenceFourTimes = CannotRepeatCharInSequenceFourTimes;
