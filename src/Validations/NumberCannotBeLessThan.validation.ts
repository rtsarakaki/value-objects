import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface NumberCannotBeLessThanInterface extends GenericValidation {
	(value: string, label: string, minNumber: number, required?: boolean, language?: string): InvalidValue | null;
}

export const NumberCannotBeLessThan: NumberCannotBeLessThanInterface = (value: string, label: string, minNumber: number, required: boolean = true, language: string = 'en-US') => {

	function validate(value: string, errorMessage: string) {
		const numValue = parseFloat(value);
		try {
			if (isNaN(numValue)) throw new InvalidValue(errorMessage);
			return numValue < minNumber ? new InvalidValue(errorMessage) : null;
		}
		catch (e) {
			return new InvalidValue(errorMessage)
		}
	}

	const replaceList = [
		{ tag: '${label}', value: label },
		{ tag: '${minNumber}', value: minNumber.toString() }
	]
	return validationAcceleratorSuggestion(validate, value, label, required, "NumberCannotBeLessThan", language, replaceList)
};