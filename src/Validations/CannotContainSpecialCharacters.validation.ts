import { InvalidValue } from "../Errors";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { validateLabel } from "./ValidationsTools";

export const CannotContainSpecialCharacters = (value: string, label: string, language: string = 'en-US') => {
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const replaceList = [
		{ tag: '${label}', value: label },
	]
	const errorMessage = getResourceMessageByKey(CannotContainSpecialCharacters.name, language, replaceList)

	if (typeof value !== 'string') return new InvalidValue(errorMessage);

	let regex = /^[a-zA-Z0-9\s\p{L}]+$/u;
	return regex.test(value) ? null: new InvalidValue(errorMessage) ;
};