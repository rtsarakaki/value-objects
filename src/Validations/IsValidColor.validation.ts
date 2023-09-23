import validateColor from "validate-color";
import { InvalidValue } from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { validateLabel } from "./ValidationsTools";

export const IsValidColor = (value: string, label: string, language: string = 'en-US') => {
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const replaceList = [
		{ tag: '${label}', value: label },
	]
	const errorMessage = getResourceMessageByKey(IsValidColor.name, language, replaceList)

	function colorValidation(color: string) {
		try {
			if (typeof color !== 'string') throw new InvalidValue(errorMessage);
			return validateColor(color.trim());
		} catch (err) {
			return false;
		}
	}

	return !colorValidation(value) ? new InvalidValue(errorMessage) : null;
};