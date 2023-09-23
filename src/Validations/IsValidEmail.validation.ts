import { InvalidValue } from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { validateLabel } from "./ValidationsTools";

export const IsValidEmail = (valor: string, label: string, language: string = 'en-US') => {
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const replaceList = [
		{ tag: '${label}', value: label },
	]
	const errorMessage = getResourceMessageByKey(IsValidEmail.name, language, replaceList)

	function validateEmail(email: string) {
		try {
			if (typeof email !== 'string') throw new InvalidValue(errorMessage);
			return /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);
		} catch (err) {
			return false;
		}
	}

	return !validateEmail(valor) ? new InvalidValue(errorMessage) : null;
};