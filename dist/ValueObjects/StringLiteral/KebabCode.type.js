"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKebabCode = exports.KebabCode = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
const CannotHaveMoreThanXCharacters_validation_1 = require("../../Validations/CannotHaveMoreThanXCharacters.validation");
const MustHaveAtLeastXCharacters_validation_1 = require("../../Validations/MustHaveAtLeastXCharacters.validation");
const MustHaveOnlyOneWord_validation_1 = require("../../Validations/MustHaveOnlyOneWord.validation");
const MustStartWithAlphaNumeric_validation_1 = require("../../Validations/MustStartWithAlphaNumeric.validation");
class KebabCode extends Types_1.GenericType {
    constructor(value, label = null, required = true, ...customValidators) {
        const msg = label ?? 'Kebab Code';
        super(value);
        const formatedValue = formatValue(value);
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(formatedValue, msg, required),
            () => (0, MustHaveAtLeastXCharacters_validation_1.MustHaveAtLeastXCharacters)(formatedValue, msg, 1),
            () => (0, CannotHaveMoreThanXCharacters_validation_1.CannotHaveMoreThanXCharacters)(formatedValue, msg, 50),
            () => (0, MustHaveOnlyOneWord_validation_1.MustHaveOnlyOneWord)(value, msg),
            () => (0, MustStartWithAlphaNumeric_validation_1.MustStartWithAlphaNumeric)(formatedValue, msg),
            () => (0, Validations_1.RegexMatch)(formatedValue, '^[a-z0-9]+(-[a-z0-9]+)*$', 'must contain only letters, numbers or non-consecutive dashes', msg),
        ];
        const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0) {
            this.value = formatedValue;
        }
    }
}
exports.KebabCode = KebabCode;
function formatValue(value) {
    if (value === null)
        return '';
    if (value === undefined)
        return '';
    return value.toString().trim().toLowerCase();
}
function createKebabCode(value, label = null) {
    return new KebabCode(value, label);
}
exports.createKebabCode = createKebabCode;
