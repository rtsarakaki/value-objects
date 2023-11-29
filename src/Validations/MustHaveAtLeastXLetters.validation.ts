import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface MustHaveAtLeastXLettersInterface extends GenericValidation {
	(value: string, label: string, lettersNumber: number, required?: boolean, language?: string): InvalidValue | null;
}

export const MustHaveAtLeastXLetters: MustHaveAtLeastXLettersInterface = (
	value: string,
	label: string,
	lettersNumber: number,
	required: boolean = true,
	language: string = 'en-US'
) => {

	function validate(value: string, errorMessage: string) {
		try {
			if (typeof value !== 'string') throw new InvalidValue(errorMessage);

			const letterCount = (value.match(/[a-zA-Z]/g) || []).length;
			return letterCount < lettersNumber ? new InvalidValue(errorMessage) : null;
		}
		catch (e) {
			return new InvalidValue(errorMessage)
		}
	}

	const replaceList = [
		{ tag: '${label}', value: label },
		{ tag: '${lettersNumber}', value: lettersNumber.toString() }
	]
	return validationAcceleratorSuggestion(validate, value, label, required, "MustHaveAtLeastXLetters", language, replaceList)
};