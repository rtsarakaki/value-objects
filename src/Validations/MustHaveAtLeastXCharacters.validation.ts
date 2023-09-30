import { InvalidValue } from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validateLabel, validationAcceleratorSuggestion } from "./ValidationsTools";

interface MustHaveAtLeastXCharactersInterface extends GenericValidation {
	(value: string, label: string, charactersNumber: number, language?: string): InvalidValue | null;
}

export const MustHaveAtLeastXCharacters: MustHaveAtLeastXCharactersInterface = (
	value: string,
	label: string,
	charactersNumber: number,
	language: string = 'en-US'
) => {

	function validate(value: string, errorMessage: string) {
		try {
			if (typeof value !== 'string') throw new InvalidValue(errorMessage);

			return value?.trim().length < charactersNumber ? new InvalidValue(errorMessage) : null;
		}
		catch (e) {
			return new InvalidValue(errorMessage)
		}
	}

	const replaceList = [
		{ tag: '${label}', value: label },
		{ tag: '${charactersNumber}', value: charactersNumber.toString() }
	]
	return validationAcceleratorSuggestion(validate, value, label, "MustHaveAtLeastXCharacters", language, replaceList)
};