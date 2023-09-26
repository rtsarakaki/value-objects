import { InvalidValue } from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validateLabel } from "./ValidationsTools";

interface IsValidDateInterface extends GenericValidation {
	(value: string, label: string, language?: string): InvalidValue | null;
}

export const IsValidDate: IsValidDateInterface = (value: string, label: string, language: string = 'en-US') => {
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const replaceList = [
		{ tag: '${label}', value: label },
	]
	const errorMessage = getResourceMessageByKey("IsValidColor", language, replaceList)

	function colorValidation(date: string) {
		try {
			if (typeof date !== 'string') return false;
			const dateObj = new Date(date.trim())
			const isValid = dateObj.toString() !== 'Invalid Date'
			console.log('isValid', isValid)
			return isValid
		} catch (err) {
			console.log('houve erro', err)
			return false;
		}
	}

	return !colorValidation(value) ? new InvalidValue(errorMessage) : null;
};