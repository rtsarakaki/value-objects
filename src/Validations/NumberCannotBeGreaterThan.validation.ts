import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface NumberCannotBeGreaterThanInterface extends GenericValidation {
	(value: string, label: string, maxNumber: number, required?: boolean, language?: string): InvalidValue | null;
}

export const NumberCannotBeGreaterThan: NumberCannotBeGreaterThanInterface = (value: string, label: string, maxNumber: number, required: boolean = true, language: string = 'en-US') => {

	function validate(value: string, errorMessage: string) {
		const numValue = parseFloat(value);
		try {
			if (isNaN(numValue)) throw new InvalidValue(errorMessage);
			return numValue > maxNumber ? new InvalidValue(errorMessage) : null;
		}
		catch (e) {
			return new InvalidValue(errorMessage)
		}
	}

	const replaceList = [
		{ tag: '${label}', value: label },
		{ tag: '${maxNumber}', value: maxNumber.toString() }
	]
	return validationAcceleratorSuggestion(validate, value, label, required, "NumberCannotBeGreaterThan", language, replaceList)
};