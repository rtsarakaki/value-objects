"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNumber = exports.Number = void 0;
const Types_1 = require("../../Types");
const IsValidNumber_validation_1 = require("../../Validations/IsValidNumber.validation");
class Number extends Types_1.GenericType {
    constructor(value, label, ...customValidators) {
        const msg = label ?? 'Number';
        super(value);
        const defaultValidators = [
            () => (0, IsValidNumber_validation_1.IsValidNumber)(value, msg),
        ];
        const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0) {
            this.value = parseFloat(value.toString());
        }
    }
}
exports.Number = Number;
function createNumber(value, label) {
    return new Number(value, label);
}
exports.createNumber = createNumber;
