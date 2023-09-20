import InvalidValue from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { validateLabel } from "./ValidationsTools";

export const IsValidUrl = (valor: string, label: string, language: string = 'en-US') => {

	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const replaceList = [
		{ tag: '${label}', value: label },
	]
	const errorMessage = getResourceMessageByKey(IsValidUrl.name, language, replaceList)

	function validateUrl(url: string) {
		try {
			if (typeof url !== 'string') throw new InvalidValue(errorMessage);
			new URL(url);
			return true;
		} catch (err) {
			return false;
		}
	}

	return !validateUrl(valor) ? new InvalidValue(errorMessage) : null;
};