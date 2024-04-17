import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface IsValidDDDInterface extends GenericValidation {
	(value: string, label: string, dddList: any[], required?: boolean, language?: string): InvalidValue | null;
}

export const IsValidDDD: IsValidDDDInterface = (value: string, label: string, dddList: any[], required: boolean = true, language: string = 'en-US') => {

	function validateDDD(DDD: string, errorMessage: string) {
		
		try {
			const normalizedDDD = normalizeDDD(DDD);
			if (!normalizedDDD) {
				return new InvalidValue(errorMessage);
			}

			const ddd = parseInt(normalizedDDD.substring(0, 2));
			if (ddd < 11 || ddd > 98) {
				return new InvalidValue(errorMessage);
			}

			for (const [_, ddds] of dddList) {
				if (ddds.includes(ddd)) {
					return null;
				}
			}

			return new InvalidValue(errorMessage);

		} catch (err) {
			return new InvalidValue(errorMessage);
		}
	}

	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validateDDD, value, label, required, "IsValidMobilePhoneNumberBR", language, replaceList)
};

export function normalizeDDD(DDD: string): string | null {
	// Remove all non-digit characters
	const normalized = DDD.replace(/\D/g, '');

	// If the number has less than 2 digits, it's invalid
	if (normalized.length < 2) {
		return null;
	}

	// If the number has more than 2 digits, it's invalid
	if (normalized.length > 2) {
		return null;
	}

	// If the DDD is invalid, the number is invalid
	if (!/^[1-9]{2}$/.test(normalized)) {
		return null;
	}

	// Otherwise, return the normalized DDD
	return normalized;
}

