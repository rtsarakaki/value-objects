import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface CannotHaveMoreThanXCharactersInterface extends GenericValidation {
	(value: string, label: string, charactersNumber: number, required?: boolean, language?: string): InvalidValue | null;
}

export const CannotHaveMoreThanXCharacters: CannotHaveMoreThanXCharactersInterface = (value: string, label: string, charactersNumber: number, required: boolean = true, language: string = 'en-US') => {

	function validate(value: string, errorMessage: string) {
		try {
			if (typeof value !== 'string') throw new InvalidValue(errorMessage);
			return value?.trim().length > charactersNumber ? new InvalidValue(errorMessage) : null;
		}
		catch (e) {
			return new InvalidValue(errorMessage)
		}
	}

	const replaceList = [
		{ tag: '${label}', value: label },
		{ tag: '${charactersNumber}', value: charactersNumber.toString() }
	]
	return validationAcceleratorSuggestion(validate, value, label, required, "CannotHaveMoreThanXCharacters", language, replaceList)
};

