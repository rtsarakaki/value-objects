import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface IsValidEmailInterface extends GenericValidation {
	(value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}

export const IsValidEmail: IsValidEmailInterface = (value: string, label: string, required: boolean = true, language: string = 'en-US') => {

	function validateEmail(email: string, errorMessage: string) {
		try {
			if (typeof email !== 'string') return new InvalidValue(errorMessage);
			return /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email) ? null : new InvalidValue(errorMessage);
		} catch (err) {
			return new InvalidValue(errorMessage);
		}
	}
	
	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validateEmail, value, label, required, "IsValidEmail", language, replaceList)
};