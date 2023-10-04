import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface CannotContainSpecialCharactersInterface extends GenericValidation {
	(value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}

export const CannotContainSpecialCharacters: CannotContainSpecialCharactersInterface = (value: string, label: string, required: boolean = false, language: string = 'en-US') => {

	function validate(value: string, errorMessage: string) {
		if (typeof value !== 'string') return new InvalidValue(errorMessage);

		let regex = /^[a-zA-Z0-9\s\p{L}]+$/u;
		return regex.test(value) ? null : new InvalidValue(errorMessage);
	}

	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validate, value, label, required, "CannotContainSpecialCharacters", language, replaceList)
};