import { InvalidValue } from "../Errors";
import { getResourceMessageByKey } from "../Resources/Messages.resource";

export function validateLabel(value: string, language: string = 'en-US') {
	const errorMessage = getResourceMessageByKey(validateLabel.name, language)

	if (typeof value !== 'string') return new InvalidValue(errorMessage);
	if (value.trim() === '') return new InvalidValue(errorMessage);
	return null;
}

export function validationAcceleratorSuggestion(validationCallback: Function, value: any, label: string, messageKey: string, language: string, replaceList: any[]): InvalidValue | null {
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const errorMessage = getResourceMessageByKey(messageKey, language, replaceList)

	return validationCallback(value, errorMessage)
}
