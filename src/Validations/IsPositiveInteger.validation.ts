import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { convertStringToNumber } from "./IsValidNumber.validation";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface IsPositiveIntegerInterface extends GenericValidation {
	(value: number | string, label: string, language?: string): InvalidValue | null;
}

export const IsPositiveInteger: IsPositiveIntegerInterface = (value: number | string, label: string, language: string = 'en-US') => {

	function validate(value: number | string, errorMessage: string) {

		const convertedToNumber = convertStringToNumber(value);

		if (convertedToNumber instanceof InvalidValue) return new InvalidValue(errorMessage, convertedToNumber) 

		const isInteger = Number.isInteger(convertedToNumber)
		if (!isInteger) return new InvalidValue(errorMessage, new InvalidValue(`Value '${value}' is not an integer`))

		const isPositive = convertedToNumber >= 0;
		if (!isPositive) return new InvalidValue(errorMessage, new InvalidValue(`Value  '${value}' is not positive`))

		return null
	}

	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validate, value, label, "IsPositiveInteger", language, replaceList)
};



