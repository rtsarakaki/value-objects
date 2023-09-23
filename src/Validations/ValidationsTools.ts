import { InvalidValue  }from "../Errors";
import { getResourceMessageByKey } from "../Resources/Messages.resource";

export function validateLabel(value: string, language: string = 'en-US') {
	const errorMessage = getResourceMessageByKey(validateLabel.name, language)

	if (typeof value !== 'string') return new InvalidValue(errorMessage);
	if (value.trim() === '') return new InvalidValue(errorMessage);
	return null;
}