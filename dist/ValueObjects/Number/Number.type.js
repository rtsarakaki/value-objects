"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNumber = exports.Number = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
const IsValidNumber_validation_1 = require("../../Validations/IsValidNumber.validation");
const NumberCannotBeGreaterThan_validation_1 = require("../../Validations/NumberCannotBeGreaterThan.validation");
const NumberCannotBeLessThan_validation_1 = require("../../Validations/NumberCannotBeLessThan.validation");
class Number extends Types_1.GenericType {
    constructor(value, label, required = true, maxNumber, minNumber, language = "en-US", ...customValidators) {
        const msg = label ?? "Number";
        super(value);
        const valueAsString = value !== null && value !== undefined ? value.toString() : '';
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(valueAsString, msg, required, language),
            () => (0, IsValidNumber_validation_1.IsValidNumber)(valueAsString, msg, required, language),
            ...(maxNumber !== undefined && value != null
                ? [
                    () => (0, NumberCannotBeGreaterThan_validation_1.NumberCannotBeGreaterThan)(valueAsString, msg, maxNumber, required, language),
                ]
                : []),
            ...(minNumber !== undefined && value != null
                ? [
                    () => (0, NumberCannotBeLessThan_validation_1.NumberCannotBeLessThan)(valueAsString, msg, minNumber, required, language),
                ]
                : []),
        ];
        const validators = customValidators.length > 0
            ? [...defaultValidators, ...customValidators]
            : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0 && value) {
            this.value = parseFloat(valueAsString);
        }
    }
}
exports.Number = Number;
function createNumber(value, label, required = true, maxNumber, minNumber, language = "en-US", ...customValidators) {
    return new Number(value, label, required, maxNumber, minNumber, language, ...customValidators);
}
exports.createNumber = createNumber;
