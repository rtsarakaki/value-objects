import InvalidValue from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { validateLabel } from "./ValidationsTools";

export const CannotHaveSpecialCharacters = (value: string, label: string, language: string = 'en-US') => {
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const replaceList = [
		{ tag: '${label}', value: label },
	]
	const errorMessage = getResourceMessageByKey(CannotHaveSpecialCharacters.name, language, replaceList)

	if (typeof value !== 'string') return new InvalidValue(errorMessage);

	let regex = /^[a-zA-Z0-9\s\p{L}]+$/u;
	return regex.test(value) ? null: new InvalidValue(errorMessage) ;
};