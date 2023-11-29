"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPositiveInteger = exports.PositiveInteger = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
const IsPositiveInteger_validation_1 = require("../../Validations/IsPositiveInteger.validation");
class PositiveInteger extends Types_1.GenericType {
    constructor(value, label, required = true, maxNumber, minNumber, language = 'en-US', ...customValidators) {
        const msg = label ?? 'Positive Integer';
        super(value);
        const valueAsString = value !== null && value !== undefined ? value.toString() : '';
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(valueAsString, msg, required, language),
            () => (0, IsPositiveInteger_validation_1.IsPositiveInteger)(value, msg, required, language),
            ...maxNumber !== undefined && value != null ? [() => (0, Validations_1.NumberCannotBeGreaterThan)(valueAsString, msg, maxNumber, required, language)] : [],
            ...minNumber !== undefined && value != null ? [() => (0, Validations_1.NumberCannotBeLessThan)(valueAsString, msg, minNumber, required, language)] : [],
        ];
        const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0 && value) {
            this.value = parseInt(valueAsString);
        }
    }
}
exports.PositiveInteger = PositiveInteger;
function createPositiveInteger(value, label, required = true, maxNumber, minNumber, language = 'en-US', ...customValidators) {
    return new PositiveInteger(value, label, required, maxNumber, minNumber, language, ...customValidators);
}
exports.createPositiveInteger = createPositiveInteger;
