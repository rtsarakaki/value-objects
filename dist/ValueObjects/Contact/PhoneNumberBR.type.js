"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPhoneNumberBR = exports.createPhoneNumberBR = exports.PhoneNumberBR = void 0;
const Types_1 = require("../../Types");
const Validations_1 = require("../../Validations");
const IsValidPhoneNumberBR_validation_1 = require("../../Validations/IsValidPhoneNumberBR.validation");
const DDD_type_1 = require("./DDD.type");
class PhoneNumberBR extends Types_1.GenericType {
    constructor(value, label = null, required = true, language = 'en-US', ...customValidators) {
        super(value);
        this.DDD = new DDD_type_1.DDD('');
        const msg = label ?? 'Phone';
        const normalizedPhoneNumber = (0, IsValidPhoneNumberBR_validation_1.normalizePhoneNumber)(value);
        const defaultValidators = [
            () => (0, Validations_1.CannotBeBlank)(value, msg, required, language),
            () => (0, IsValidPhoneNumberBR_validation_1.IsValidPhoneNumberBR)(normalizedPhoneNumber, msg, required, language),
        ];
        const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
        this.validate(validators);
        if (this.errors.length === 0) {
            const phoneNumberCleaned = normalizedPhoneNumber;
            this.DDD = new DDD_type_1.DDD(phoneNumberCleaned.substring(0, 2));
            this.value = formatPhoneNumberBR(phoneNumberCleaned);
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
const phoneNumberBR = new PhoneNumberBR('11987654321');
console.log(phoneNumberBR);
