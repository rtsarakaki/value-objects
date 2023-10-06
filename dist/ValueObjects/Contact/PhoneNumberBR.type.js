"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPhoneNumberBR = exports.createPhoneNumberBR = exports.PhoneNumberBR = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
const IsValidPhoneNumberBR_validation_1 = require("../../Validations/IsValidPhoneNumberBR.validation");
class PhoneNumberBR extends Types_1.GenericType {
    constructor(value, label = null, required = true, language = 'en-US', ...customValidators) {
        super(value);
        const msg = label ?? 'Email';
        const normalizedPhoneNumber = (0, IsValidPhoneNumberBR_validation_1.normalizePhoneNumber)(value);
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(value, msg, required, language),
            () => (0, IsValidPhoneNumberBR_validation_1.IsValidPhoneNumberBR)(normalizedPhoneNumber, msg, required, language),
        ];
        const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0) {
            this.value = formatPhoneNumberBR(normalizedPhoneNumber);
            console.log(this.value);
        }
    }
}
exports.PhoneNumberBR = PhoneNumberBR;
function createPhoneNumberBR(value, label = null, required = true, language = 'en-US', ...customValidators) {
    return new PhoneNumberBR(value, label, required, language, ...customValidators);
}
exports.createPhoneNumberBR = createPhoneNumberBR;
function formatPhoneNumberBR(phoneNumber) {
    const phoneNumberRegex = /^(\d{2})(\d{4,5})(\d{4})$/;
    const matches = phoneNumber.match(phoneNumberRegex);
    if (matches) {
        return `(${matches[1]}) ${matches[2]}-${matches[3]}`;
    }
    return phoneNumber;
}
exports.formatPhoneNumberBR = formatPhoneNumberBR;
