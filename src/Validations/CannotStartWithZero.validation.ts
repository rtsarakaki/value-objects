import { InvalidValue } from "../Errors";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validateLabel } from "./ValidationsTools";

export const CannotStartWithZero: GenericValidation = (value: string, label: string, language: string = 'en-US') => {
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const replaceList = [
		{ tag: '${label}', value: label },
	]
	const errorMessage = getResourceMessageByKey("CannotStartWithZero", language, replaceList)

	if (typeof value !== 'string') return new InvalidValue(errorMessage);
	return value.trim()[0] === '0' ? new InvalidValue(errorMessage) : null;
};
