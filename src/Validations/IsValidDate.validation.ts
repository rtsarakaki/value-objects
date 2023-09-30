import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface IsValidDateInterface extends GenericValidation {
	(value: string, label: string, language?: string): InvalidValue | null;
}

export const IsValidDate: IsValidDateInterface = (value: string, label: string, language: string = 'en-US') => {

	function dateValidation(date: string, errorMessage: string) {
		try {
			if (typeof date !== 'string') return new InvalidValue(errorMessage);
			const dateObj = new Date(date.trim())
			const isValid = dateObj.toString() !== 'Invalid Date'
			return isValid ? null : new InvalidValue(errorMessage);
		} catch (err) {
			return new InvalidValue(errorMessage);
		}
	}

	const replaceList = [
		{ tag: '${label}', value: label },
		{ tag: '${value}', value: value },
	]
	return validationAcceleratorSuggestion(dateValidation, value, label, "IsValidDate", language, replaceList)
};