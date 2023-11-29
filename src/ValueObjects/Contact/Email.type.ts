import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank, MustHaveAtLeastXCharacters, CannotHaveMoreThanXCharacters, MustHaveOnlyOneWord, IsValidEmail, EmailDomainWhiteList, EmailDomainBlackList } from "../../Validations";

export class Email extends GenericType {
	constructor(value: string, label: string | null = null, required: boolean = true, blackListDomains: string[] = [], whiteListDomains: string[] = [], language: string = 'en-US', ...customValidators: GenericValidation[]) {
		super(value);

		const msg = label ?? 'Email';

		const defaultValidators = [
			() => CannotBeBlank(value, msg, required, language),
			() => MustHaveAtLeastXCharacters(value, msg, 5, required, language),
			() => CannotHaveMoreThanXCharacters(value, msg, 80, required, language),
			() => MustHaveOnlyOneWord(value, msg, required, language),
			() => IsValidEmail(value, msg, required, language),
			() => EmailDomainWhiteList(value, msg, whiteListDomains, required, language),
			() => EmailDomainBlackList(value, msg, blackListDomains, required, language),
		];
		const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
		this.validate(validators);
	}
}

export function createEmail(value: string, label: string | null = null, required: boolean = true, language: string = 'en-US', whiteListDomains: string[] = [], blackListDomains: string[] = [], ...customValidators: GenericValidation[]) {
	return new Email(value, label, required, blackListDomains, whiteListDomains,  language,  ...customValidators);
}