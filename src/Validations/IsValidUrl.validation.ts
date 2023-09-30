import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface IsValidUrlInterface extends GenericValidation {
	(value: string, label: string, language?: string): InvalidValue | null;
}

export const IsValidUrl: IsValidUrlInterface = (value: string, label: string, language: string = 'en-US') => {

	function validateUrl(url: string, errorMessage: string) {
		try {
			if (typeof url !== 'string') return new InvalidValue(errorMessage);
			new URL(url);
			return null;
		} catch (err) {
			return new InvalidValue(errorMessage);
		}
	}
	
	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validateUrl, value, label, "IsValidUrl", language, replaceList)
};