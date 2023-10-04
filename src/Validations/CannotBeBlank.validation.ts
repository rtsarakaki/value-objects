import { InvalidValue } from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validateLabel, validationAcceleratorSuggestion } from "./ValidationsTools";

interface CannotBeBlankInterface extends GenericValidation {
	(value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}

export const CannotBeBlank: CannotBeBlankInterface = (value: string, label: string, _: boolean = true, language: string = 'en-US') => {
	const replaceList = [{ tag: '${label}', value: label }]
	const errorMessage = getResourceMessageByKey("CannotBeBlank", language, replaceList)

	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	if (typeof value !== 'string') return new InvalidValue(errorMessage);

	const valueUndefinedNullOrEmpty = (value === null || value === undefined || value.length === 0 || value?.trim() === '')
	return valueUndefinedNullOrEmpty ? new InvalidValue(errorMessage) : null
};


