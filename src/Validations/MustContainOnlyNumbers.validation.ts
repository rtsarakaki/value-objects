import { InvalidValue } from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validateLabel } from "./ValidationsTools";

interface MustContainOnlyNumbersInterface extends GenericValidation {
	(value: string, label: string, language?: string): InvalidValue | null;
}

export const MustContainOnlyNumbers: MustContainOnlyNumbersInterface = (value: string, label: string, language: string = 'en-US') => {

	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const replaceList = [
		{ tag: '${label}', value: label },
	]
	const errorMessage = getResourceMessageByKey("MustContainOnlyNumbers", language, replaceList)

	if (typeof value !== 'string') return new InvalidValue(errorMessage);
	return isNaN(Number(value))
		? new InvalidValue(errorMessage)
		: null;
};