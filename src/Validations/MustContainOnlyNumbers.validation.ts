import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface MustContainOnlyNumbersInterface extends GenericValidation {
	(value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}

export const MustContainOnlyNumbers: MustContainOnlyNumbersInterface = (value: string, label: string, required: boolean = true, language: string = 'en-US') => {

	function validate(value: string, errorMessage: string) {
		if (typeof value !== 'string') return new InvalidValue(errorMessage);
		return isNaN(Number(value))
			? new InvalidValue(errorMessage)
			: null;
	}

	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validate, value, label, required, "MustContainOnlyNumbers", language, replaceList)
};