import { InvalidValue } from "../Errors";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validateLabel, validationAcceleratorSuggestion } from "./ValidationsTools";

interface MustStartWithAlphaNumericInterface extends GenericValidation {
	(value: string, label: string, language?: string): InvalidValue | null;
}

export const MustStartWithAlphaNumeric: MustStartWithAlphaNumericInterface = (value: string, label: string, language: string = 'en-US') => {

	function validate(value: string, errorMessage: string) {
		if (value === undefined || value === null || typeof value !== 'string') {
			return new InvalidValue(errorMessage);
		}

		const trimmedValue = value.trim();
		if (trimmedValue.length === 0) {
			return new InvalidValue(errorMessage);
		}

		const firstChar = trimmedValue[0];
		if (!firstChar.match(/^[a-zA-Z0-9]+$/)) {
			return new InvalidValue(errorMessage);
		}

		return null;
	}

	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validate, value, label, "MustStartWithAlphaNumeric", language, replaceList)
};
