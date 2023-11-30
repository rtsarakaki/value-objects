"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKebabCode = exports.KebabCode = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
class KebabCode extends Types_1.GenericType {
    constructor(value, label = null, required = true, language = "en-US", ...customValidators) {
        const msg = label ?? "Kebab Code";
        super(value);
        const formatedValue = formatValue(value);
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(formatedValue, msg, required, language),
            () => (0, Validations_1.MustHaveAtLeastXLetters)(value, msg, 2, required, language),
            () => (0, Validations_1.CannotHaveMoreThanXCharacters)(formatedValue, msg, 50, required, language),
            () => (0, Validations_1.MustHaveOnlyOneWord)(value, msg, required, language),
            () => (0, Validations_1.MustStartWithAlphaNumeric)(formatedValue, msg, required, language),
            () => (0, Validations_1.MustEndWithAlphaNumeric)(formatedValue, msg, required, language),
            () => (0, Validations_1.RegexMatch)(formatedValue, msg, "^[a-z0-9]+(-[a-z0-9]+)*$", "must contain only letters, numbers or non-consecutive dashes", required, language),
        ];
        const validators = customValidators.length > 0
            ? [...defaultValidators, ...customValidators]
            : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0) {
            this.value = formatedValue;
        }
    }
}
exports.KebabCode = KebabCode;
function formatValue(value) {
    if (value === null)
        return "";
    if (value === undefined)
        return "";
    return value.toString().trim().toLowerCase();
}
function createKebabCode(value, label = null, required = true, language = "en-US", ...customValidators) {
    return new KebabCode(value, label, required, language, ...customValidators);
}
exports.createKebabCode = createKebabCode;
