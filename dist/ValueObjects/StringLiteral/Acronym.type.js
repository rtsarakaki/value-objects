"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAcronymCode = exports.Acronym = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
class Acronym extends Types_1.GenericType {
    constructor(value, label = null, required = true, upper, language = 'en-US', ...customValidators) {
        const msg = label ?? 'Acronym';
        super(value);
        const formatedValue = formatValue(value, upper);
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(formatedValue, msg, required, language),
            () => (0, Validations_1.MustHaveAtLeastXCharacters)(formatedValue, msg, 2, required, language),
            () => (0, Validations_1.CannotHaveMoreThanXCharacters)(formatedValue, msg, 5, required, language),
            () => (0, Validations_1.MustHaveOnlyOneWord)(value, msg, required, language),
        ];
        const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0) {
            this.value = formatedValue;
        }
    }
}
exports.Acronym = Acronym;
function formatValue(value, upperCase) {
    if (value === null)
        return '';
    if (value === undefined)
        return '';
    return upperCase ? value.toString().trim().toUpperCase() : value.toString().trim().toLowerCase();
}
function createAcronymCode(value, label = null, required = true, upper = true, language = 'en-US', ...customValidators) {
    return new Acronym(value, label, required, upper, language, ...customValidators);
}
exports.createAcronymCode = createAcronymCode;
