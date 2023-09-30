import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface CannotStartWithZeroInterface extends GenericValidation {
	(value: string, label: string, language?: string): InvalidValue | null;
}

export const CannotStartWithZero: CannotStartWithZeroInterface = (value: string, label: string, language: string = 'en-US') => {

	function validate(value: string, errorMessage: string) {
		if (typeof value !== 'string') return new InvalidValue(errorMessage);
		return value.trim()[0] === '0' ? new InvalidValue(errorMessage) : null;
	}

	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validate, value, label, "CannotStartWithZero", language, replaceList)
};
