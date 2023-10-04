"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustHaveOnlyOneWord = void 0;
const Errors_1 = require("../Errors");
const ValidationsTools_1 = require("./ValidationsTools");
const MustHaveOnlyOneWord = (value, label, required = true, language = 'en-US') => {
    const replaceList = [
        { tag: '${label}', value: label },
    ];
    function validate(value, errorMessage) {
        try {
            const haveSpace = value?.trim().indexOf(' ') != -1;
            const haveTab = value?.trim().indexOf('	') != -1;
            const haveReturn = value?.trim().indexOf(`
		`) != -1;
            return (haveSpace || haveReturn || haveTab) ? new Errors_1.InvalidValue(errorMessage) : null;
        }
        catch (e) {
            return new Errors_1.InvalidValue(errorMessage);
        }
    }
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, required, "MustHaveOnlyOneWord", language, replaceList);
};
exports.MustHaveOnlyOneWord = MustHaveOnlyOneWord;
