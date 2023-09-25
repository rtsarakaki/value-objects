import { InvalidValue } from "../Errors";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validateLabel } from "./ValidationsTools";

export const RegexMatch: GenericValidation = (value: string, textRegex: string, regexExplanation: string, label: string, language: string = 'en-US') => {
	
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation
	
	const regexValidation = validateRegex(textRegex)
	if (regexValidation !== null) return regexValidation
	
	const regex = createRegexFromString(textRegex)

	const replaceList = [
		{ tag: '${label}', value: label },
		{ tag: '${regex}', value: regexExplanation },
	]
	const errorMessage = getResourceMessageByKey("RegexMatch", language, replaceList)

	
	return testRegex(regex, value, errorMessage)
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