import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface CannotContainNumbersInterface extends GenericValidation {
	(value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}

export const CannotContainNumbers: CannotContainNumbersInterface = (value: string, label: string, required: boolean = true, language: string = 'en-US') => {

	function validate(value: string, errorMessage: string) {
		const regex = /\d/;
		return regex.test(value) ? new InvalidValue(errorMessage) : null;
	}

	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validate, value, label, required, "CannotContainNumbers", language, replaceList)
};


