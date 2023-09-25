import { InvalidValue } from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validateLabel } from "./ValidationsTools";

export const MustHaveAtLeastXCharacters: GenericValidation = (
	value: string,
	label: string,
	charactersNumber: number,
	language: string = 'en-US'
) => {

	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const replaceList = [
		{ tag: '${label}', value: label },
		{ tag: '${charactersNumber}', value: charactersNumber.toString() }
	]
	const errorMessage = getResourceMessageByKey("MustHaveAtLeastXCharacters", language, replaceList)

	try {
		if (typeof value !== 'string') throw new InvalidValue(errorMessage);
		
		return value?.trim().length < charactersNumber ? new InvalidValue(errorMessage) : null;
	}
	catch (e) {
		return new InvalidValue(errorMessage)
	}
};