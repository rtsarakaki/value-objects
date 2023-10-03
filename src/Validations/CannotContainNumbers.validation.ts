import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface CannotContainNumbersInterface extends GenericValidation {
	(value: string, label: string, language?: string): InvalidValue | null;
}

export const CannotContainNumbers: CannotContainNumbersInterface = (value: string, label: string, language: string = 'en-US') => {

	function validate(value: string, errorMessage: string) {

		if (typeof value !== 'string') return new InvalidValue(errorMessage);

		const regex = /\d/;
		return regex.test(value) ? new InvalidValue(errorMessage) : null;
	}

	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validate, value, label, "CannotContainNumbers", language, replaceList)
};


