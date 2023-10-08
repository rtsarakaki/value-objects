import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface IsValidPhoneNumberInterface extends GenericValidation {
	(value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}

export const IsValidPhoneNumberBR: IsValidPhoneNumberInterface = (value: string, label: string, required: boolean = true, language: string = 'en-US') => {

	function validateMobilePhoneNumberBR(phoneNumber: string, errorMessage: string) {
		try {
			const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);
			if (!normalizedPhoneNumber) {
				return new InvalidValue(errorMessage);
			}

			const ddd = parseInt(normalizedPhoneNumber.substring(0, 2));
			if (ddd < 11 || ddd > 98) {
				return new InvalidValue(errorMessage);
			}

			return null;

		} catch (err) {
			return new InvalidValue(errorMessage);
		}
	}

	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validateMobilePhoneNumberBR, value, label, required, "IsValidMobilePhoneNumberBR", language, replaceList)
};

export function normalizePhoneNumber(phoneNumber: string): string | null {
	// Remove all non-digit characters
	const normalized = phoneNumber.replace(/\D/g, '').replaceAll('.', '');

	// If the number starts with 55, remove it
	if (normalized.startsWith('55')) {
		return normalizePhoneNumber(normalized.substring(2));
	}

	// If the number starts with a plus sign, remove it
	if (normalized.startsWith('+')) {
		return normalizePhoneNumber(normalized.substring(1));
	}

	// If the number has less than 10 digits, it's invalid
	if (normalized.length < 10) {
		return null;
	}

	// If the number has more than 11 digits, it's invalid
	if (normalized.length > 11) {
		return null;
	}

	// Remove the first two digits of the DDD
	const ddd = normalized.substring(0, 2);
	const phoneNumberWithoutDdd = normalized.substring(2);

	// If the DDD is invalid, the number is invalid
	if (!/^[1-9]{2}$/.test(ddd)) {
		return null;
	}

	// If the number has 9 digits and starts with 9, it's a valid mobile phone number
	if (/^9\d{8}$/.test(phoneNumberWithoutDdd)) {
		return `${ddd}${phoneNumberWithoutDdd}`;
	}

	// If the number has 8 digits and starts with 2-5 or 7-9, it's a valid mobile phone number
	if (/^[2-5|7-9]\d{7}$/.test(phoneNumberWithoutDdd)) {
		return `${ddd}${phoneNumberWithoutDdd}`;
	}

	// Otherwise, the number is invalid
	return null;
}

