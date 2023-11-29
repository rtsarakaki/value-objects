"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAcronymCode = exports.Acronym = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
class Acronym extends Types_1.GenericType {
    constructor(value, label, required, upper, language, ...customValidators) {
        const _label = label || "Acronym";
        const _required = required ?? false;
        const _upper = upper ?? true;
        const _language = language || "en-US";
        super(value);
        const formatedValue = formatValue(value, _upper);
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(formatedValue, _label, _required, _language),
            () => (0, Validations_1.MustHaveAtLeastXCharacters)(formatedValue, _label, 2, _required, _language),
            () => (0, Validations_1.CannotHaveMoreThanXCharacters)(formatedValue, _label, 5, _required, _language),
            () => (0, Validations_1.MustHaveOnlyOneWord)(value, _label, _required, _language),
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
exports.Acronym = Acronym;
function formatValue(value, upperCase) {
    if (value === null)
        return "";
    if (value === undefined)
        return "";
    return upperCase
        ? value.toString().trim().toUpperCase()
        : value.toString().trim().toLowerCase();
}
function createAcronymCode(value, label, required = true, upper = true, language = "en-US", ...customValidators) {
    return new Acronym(value, label, required, upper, language, ...customValidators);
}
exports.createAcronymCode = createAcronymCode;
