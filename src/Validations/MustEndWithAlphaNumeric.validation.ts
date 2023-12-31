import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface MustEndWithAlphaNumericInterface extends GenericValidation {
	(value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}

export const MustEndWithAlphaNumeric: MustEndWithAlphaNumericInterface = (value: string, label: string, required: boolean = true, language: string = 'en-US') => {

	function validate(value: string, errorMessage: string) {

		if (value === undefined || value === null || typeof value !== 'string') {
			return new InvalidValue(errorMessage);
		}

		const trimmedValue = value.trim();
		if (trimmedValue.length === 0) {
			return new InvalidValue(errorMessage);
		}

		const lastChar = trimmedValue[trimmedValue.length - 1];
		if (!lastChar.match(/^[a-zA-Z0-9]+$/)) {
			return new InvalidValue(errorMessage);
		}

		return null;
	}

	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validate, value, label, required, "MustEndWithAlphaNumeric", language, replaceList)
};
