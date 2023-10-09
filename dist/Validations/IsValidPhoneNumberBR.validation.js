"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePhoneNumber = exports.IsValidPhoneNumberBR = void 0;
const InvalidValue_error_1 = require("../Errors/InvalidValue.error");
const ValidationsTools_1 = require("./ValidationsTools");
const IsValidPhoneNumberBR = (value, label, required = true, language = 'en-US') => {
    function validateMobilePhoneNumberBR(phoneNumber, errorMessage) {
        try {
            const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);
            if (!normalizedPhoneNumber) {
                return new InvalidValue_error_1.InvalidValue(errorMessage);
            }
            const ddd = parseInt(normalizedPhoneNumber.substring(0, 2));
            if (ddd < 11 || ddd > 98) {
                return new InvalidValue_error_1.InvalidValue(errorMessage);
            }
            return null;
        }
        catch (err) {
            return new InvalidValue_error_1.InvalidValue(errorMessage);
        }
    }
    const replaceList = [{ tag: '${label}', value: label }];
    return (0, ValidationsTools_1.validationAcceleratorSuggestion)(validateMobilePhoneNumberBR, value, label, required, "IsValidMobilePhoneNumberBR", language, replaceList);
};
exports.IsValidPhoneNumberBR = IsValidPhoneNumberBR;
function normalizePhoneNumber(phoneNumber) {
    const normalized = phoneNumber.replace(/\D/g, '').replaceAll('.', '');
    if (normalized.startsWith('55')) {
        return normalizePhoneNumber(normalized.substring(2));
    }
    if (normalized.startsWith('+')) {
        return normalizePhoneNumber(normalized.substring(1));
    }
    if (normalized.length < 10) {
        return null;
    }
    if (normalized.length > 11) {
        return null;
    }
    const ddd = normalized.substring(0, 2);
    const phoneNumberWithoutDdd = normalized.substring(2);
    if (!/^[1-9]{2}$/.test(ddd)) {
        return null;
    }
    if (/^9\d{8}$/.test(phoneNumberWithoutDdd)) {
        return `${ddd}${phoneNumberWithoutDdd}`;
    }
    if (/^[2-5|7-9]\d{7}$/.test(phoneNumberWithoutDdd)) {
        return `${ddd}${phoneNumberWithoutDdd}`;
    }
    return null;
}
exports.normalizePhoneNumber = normalizePhoneNumber;
