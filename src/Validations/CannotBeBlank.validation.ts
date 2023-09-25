import { InvalidValue } from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validateLabel } from "./ValidationsTools";

export const CannotBeBlank: GenericValidation = (
	value: string,
	label: string,
	required = true,
	language: string = 'en-US'
) => {
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const replaceList = [{ tag: '${label}', value: label }]
	const errorMessage = getResourceMessageByKey("CannotBeBlank", language, replaceList)

	try {
		if (typeof value !== 'string') throw new InvalidValue(errorMessage);
		return required && (value == undefined || value.length === 0 || value?.trim() === '') ? new InvalidValue(errorMessage) : null;
	}
	catch (e) {
		return new InvalidValue(errorMessage)
	}
};