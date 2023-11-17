"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegexMatch = void 0;
const Errors_1 = require("../Errors");
const Messages_resource_1 = require("../Resources/Messages.resource");
const ValidationsTools_1 = require("./ValidationsTools");
const RegexMatch = (value, label, textRegex, regexExplanation, required = true, language = 'en-US') => {
    function validate(value, errorMessage) {
        const labelValidation = (0, ValidationsTools_1.validateLabel)(label);
        if (labelValidation !== null)
            return labelValidation;
        const regexValidation = validateRegex(textRegex);
        if (regexValidation !== null)
            return regexValidation;
        const regex = createRegexFromString(textRegex);
        return testRegex(regex, value, errorMessage);
    }
    const replaceList = [
        { tag: '${label}', value: label },
        { tag: '${regex}', value: regexExplanation },
    ];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validate, value, label, required, "RegexMatch", language, replaceList);
};
exports.RegexMatch = RegexMatch;
const createRegexFromString = (regexString) => {
    return new RegExp(regexString);
};
const validateRegex = (regex, language = 'en-US') => {
    const errorMessage = (0, Messages_resource_1.getResourceMessageByKey)('validateRegex', language, [{ tag: '${regex}', value: regex }]);
    try {
        new RegExp(regex);
        return null;
    }
    catch (error) {
        return new Errors_1.InvalidValue(errorMessage);
    }
};
const testRegex = (regex, value, errorMessage) => {
    try {
        if (regex.test(value)) {
            return null;
        }
        else {
            return new Errors_1.InvalidValue(errorMessage);
        }
    }
    catch (error) {
        return new Errors_1.InvalidValue(errorMessage);
    }
};
