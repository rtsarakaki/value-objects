import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface CannotRepeatCharInSequenceFourTimesInterface extends GenericValidation {
	(value: any, label: string, required?: boolean, language?: string): InvalidValue | null;
}

export const CannotRepeatCharInSequenceFourTimes: CannotRepeatCharInSequenceFourTimesInterface = (
	value: any,
	label: string,
	required: boolean = true,
	language: string = 'en-US'
) => {

	function validate(value: any, errorMessage: string) {
		try {
			const strValue = String(value);
			const regex = /(.)\1{3,}/;
			return regex.test(strValue) ? new InvalidValue(errorMessage) : null;
		}
		catch (e) {
			return new InvalidValue(errorMessage)
		}
	}

	const replaceList = [
		{ tag: '${label}', value: label }
	]
	return validationAcceleratorSuggestion(validate, value, label, required, "CannotRepeatCharInSequenceFourTimes", language, replaceList)
};