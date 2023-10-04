import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface MustHaveOnlyOneWordInterface extends GenericValidation {
	(value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}

export const MustHaveOnlyOneWord: MustHaveOnlyOneWordInterface = (value: string, label: string, required: boolean = true, language: string = 'en-US') => {

	const replaceList = [
		{ tag: '${label}', value: label },
	]

	function validate(value: string, errorMessage: string) {
		try {
			const haveSpace = value?.trim().indexOf(' ') != -1
			const haveTab = value?.trim().indexOf('	') != -1
			const haveReturn = value?.trim().indexOf(`
		`) != -1
			return (haveSpace || haveReturn || haveTab) ? new InvalidValue(errorMessage) : null;
		}
		catch (e) {
			return new InvalidValue(errorMessage)
		}
	}

	return validationAcceleratorSuggestion(validate, value, label, required, "MustHaveOnlyOneWord", language, replaceList)
};