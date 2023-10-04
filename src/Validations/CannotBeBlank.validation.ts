import { InvalidValue } from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validateLabel, validationAcceleratorSuggestion } from "./ValidationsTools";

interface CannotBeBlankInterface extends GenericValidation {
	(value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}

export const CannotBeBlank: CannotBeBlankInterface = (value: string, label: string, required : boolean = true, language: string = 'en-US') => {

	if (!required) return null;

	const handledString = value?.toString() ?? ''
	
	const replaceList = [{ tag: '${label}', value: label }]
	const errorMessage = getResourceMessageByKey("CannotBeBlank", language, replaceList)

	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	// if (typeof handledString !== 'string') return new InvalidValue(errorMessage);

	const valueUndefinedNullOrEmpty = (value === null || value === undefined || handledString.length === 0 || handledString?.trim() === '')
	return valueUndefinedNullOrEmpty ? new InvalidValue(errorMessage) : null
};


