"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPositiveInteger = exports.PositiveInteger = void 0;
const Types_1 = require("../../Types");
const IsPositiveInteger_validation_1 = require("../../Validations/IsPositiveInteger.validation");
class PositiveInteger extends Types_1.GenericType {
    constructor(value, label, required = true, language = 'en-US', ...customValidators) {
        const msg = label ?? 'Positive Integer';
        super(value);
        const defaultValidators = [
            () => (0, IsPositiveInteger_validation_1.IsPositiveInteger)(value, msg, required, language),
        ];
        const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0) {
            this.value = parseInt(value.toString());
        }
    }
}
exports.PositiveInteger = PositiveInteger;
function createPositiveInteger(value, label) {
    return new PositiveInteger(value, label);
}
exports.createPositiveInteger = createPositiveInteger;
