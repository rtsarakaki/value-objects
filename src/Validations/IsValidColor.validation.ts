import validateColor from "validate-color";
import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface IsValidColorInterface extends GenericValidation {
	(value: string, label: string, language?: string): InvalidValue | null;
}

export const IsValidColor: IsValidColorInterface = (value: string, label: string, language: string = 'en-US') => {

	function colorValidation(color: string, errorMessage: string) {
		try {
			if (typeof color !== 'string') return new InvalidValue(errorMessage);
			return validateColor(color.trim()) ? null : new InvalidValue(errorMessage);
		}
		catch (err) {
			return new InvalidValue(errorMessage);
		}
	}
	
	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(colorValidation, value, label, "IsValidColor", language, replaceList)
};