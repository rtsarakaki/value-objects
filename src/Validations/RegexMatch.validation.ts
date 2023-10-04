import { InvalidValue } from "../Errors";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validateLabel, validationAcceleratorSuggestion } from "./ValidationsTools";

interface RegexMatchInterface extends GenericValidation {
	(value: string, label: string, textRegex: string, regexExplanation: string, required?: boolean, language?: string): InvalidValue | null;
}

export const RegexMatch: RegexMatchInterface = (value: string, label: string, textRegex: string, regexExplanation: string, required: boolean = true, language: string = 'en-US') => {

	function validate(value: string, errorMessage: string) {

		const labelValidation = validateLabel(label)
		if (labelValidation !== null) return labelValidation

		const regexValidation = validateRegex(textRegex)
		if (regexValidation !== null) return regexValidation

		const regex = createRegexFromString(textRegex)

		return testRegex(regex, value, errorMessage)
	}

	const replaceList = [
		{ tag: '${label}', value: label },
		{ tag: '${regex}', value: regexExplanation },
	]
	return validationAcceleratorSuggestion(validate, value, label, required, "RegexMatch", language, replaceList)
};

const createRegexFromString = (regexString: string): RegExp => {
	return new RegExp(regexString);
};

const validateRegex = (regex: string, language: string = 'en-US') => {
	const errorMessage = getResourceMessageByKey(validateRegex.name, language, [{ tag: '${regex}', value: regex }])

	try {
		new RegExp(regex);
		return null;
	} catch (error) {
		return new InvalidValue(errorMessage);
	}
};

const testRegex = (regex: RegExp, value: string, errorMessage: string) => {

	try {
		if (regex.test(value)) {
			return null;
		} else {
			return new InvalidValue(errorMessage);
		}
	} catch (error) {
		return new InvalidValue(errorMessage);
	}
};