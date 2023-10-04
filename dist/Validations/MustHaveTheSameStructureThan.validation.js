"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustHaveTheSameStructureThan = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
function MustHaveTheSameStructureThan(value, label, required = true, language = 'en-US') {
    function validate(value, errorMessage) {
        try {
            const resultado = JSON.parse(value);
            const model = resultado;
            return null;
        }
        catch (e) {
            return new InvalidValue_error_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [
        { tag: '${label}', value: label },
        { tag: "${JSON.stringify('model')}", value: JSON.stringify('model') },
    ];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, required, "MustHaveTheSameStructureThan", language, replaceList);
}
exports.MustHaveTheSameStructureThan = MustHaveTheSameStructureThan;
