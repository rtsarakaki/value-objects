import { InvalidValue } from "../Errors";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { validateLabel } from "./ValidationsTools";

export const CannotContainNumbers = (value: string, label: string, language: string = 'en-US') => {

	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const replaceList = [
		{ tag: '${label}', value: label },
	]
	const errorMessage = getResourceMessageByKey(CannotContainNumbers.name, language, replaceList)

	if (typeof value !== 'string') return new InvalidValue(errorMessage);

	const regex = /\d/;
	return regex.test(value)
		? new InvalidValue(errorMessage)
		: null;
};