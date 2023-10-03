import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface CannotBeBlankInterface extends GenericValidation {
	(value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}

export const CannotBeBlank: CannotBeBlankInterface = (value: string, label: string, required: boolean = true, language: string = 'en-US') => {

	function validate(value: string, errorMessage: string) {
		if (typeof value !== 'string') return new InvalidValue(errorMessage);
		return required && (value == undefined || value.length === 0 || value?.trim() === '') ? new InvalidValue(errorMessage) : null;
	}

	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validate, value, label, "CannotBeBlank", language, replaceList)
};


