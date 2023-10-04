import { InvalidValue } from "../Errors";
import { getResourceMessageByKey } from "../Resources/Messages.resource";

export function validateLabel(value: string, language: string = 'en-US') {
	const errorMessage = getResourceMessageByKey(validateLabel.name, language)

	if (typeof value !== 'string') return new InvalidValue(errorMessage);
	if (value.trim() === '') return new InvalidValue(errorMessage);
	return null;
}

export function validationAcceleratorSuggestion(validationCallback: Function, value: any, label: string, required: boolean = false, messageKey: string, language: string, replaceList: any[]): InvalidValue | null {
	const errorMessage = getResourceMessageByKey(messageKey, language, replaceList)

	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	if (typeof value !== 'string') return new InvalidValue(errorMessage);

	const valueUndefinedNullOrEmpty = (value === null || value === undefined || value.length === 0 || value?.trim() === '')
	const mustValidate = required || !valueUndefinedNullOrEmpty
	if (!mustValidate) return null

	return validationCallback(value, errorMessage)
}
