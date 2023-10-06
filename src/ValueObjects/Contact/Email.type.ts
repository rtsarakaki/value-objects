import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank, CannotHaveMoreThanXCharacters, IsValidEmail, MustHaveAtLeastXCharacters, MustHaveOnlyOneWord } from "../../Validations";

export class Email extends GenericType {
	constructor(value: string, label: string | null = null, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
		super(value);

		const msg = label ?? 'Email';

		const defaultValidators = [
			() => CannotBeBlank(value, msg, required, language),
			() => MustHaveAtLeastXCharacters(value, msg, 5, required, language),
			() => CannotHaveMoreThanXCharacters(value, msg, 80, required, language),
			() => MustHaveOnlyOneWord(value, msg, required, language),
			() => IsValidEmail(value, msg, required, language),
		];
		const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
		this.validate(validators);
	}
}

export function createEmail(value: string, label: string | null = null, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
	return new Email(value, label, required, language, ...customValidators);
}
