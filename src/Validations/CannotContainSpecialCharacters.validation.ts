import { InvalidValue } from "../Errors";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validateLabel } from "./ValidationsTools";

export const CannotContainSpecialCharacters: GenericValidation = (value: string, label: string, language: string = 'en-US') => {
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const replaceList = [
		{ tag: '${label}', value: label },
	]
	const errorMessage = getResourceMessageByKey("CannotContainSpecialCharacters", language, replaceList)

	if (typeof value !== 'string') return new InvalidValue(errorMessage);

	let regex = /^[a-zA-Z0-9\s\p{L}]+$/u;
	return regex.test(value) ? null: new InvalidValue(errorMessage) ;
};