import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface EmailDomainWhiteListInterface extends GenericValidation {
	(value: string, label: string, domains: string[], required?: boolean, language?: string): InvalidValue | null;
}

export const EmailDomainWhiteList: EmailDomainWhiteListInterface = (value: string, label: string, domains: string[] = [], required: boolean = true, language: string = 'en-US') => {

	function validateEmailDomainWhiteList(email: string, errorMessage: string) {
		try {
			const domain = email.split('@')[1];
			if (domains.length === 0 || domains.includes(domain)) {
				return null;
			} else {
				return new InvalidValue(errorMessage);
			}
		} catch (err) {
			console.log('error', err);
			return new InvalidValue(errorMessage);
		}
	}

	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validateEmailDomainWhiteList, value, label, required, "EmailDomainWhiteList", language, replaceList)
};