import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank, CannotHaveMoreThanXCharacters, IsValidEmail, MustHaveAtLeastXCharacters, MustHaveOnlyOneWord } from "../../Validations";
import { IsValidHashtag } from "../../Validations/IsValidHashtag.validation";

export class Hashtag extends GenericType {
	constructor(value: string, label: string | null = null, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
		super(value);

		const msg = label ?? 'Email';

		const valueWithHashtag = value.startsWith('#') ? value : `#${value}`;

		const defaultValidators = [
			() => CannotBeBlank(value, msg, required, language),
			() => MustHaveAtLeastXCharacters(value, msg, 1, required, language),
			() => CannotHaveMoreThanXCharacters(value, msg, 80, required, language),
			() => MustHaveOnlyOneWord(value, msg, required, language),
			() => IsValidHashtag(valueWithHashtag, msg, required, language),
		];
		const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
		this.validate(validators);

		if (this.errors.length === 0) {
			this.value = valueWithHashtag
		}
	}
}

export function createHashtag(value: string, label: string | null = null, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
	return new Hashtag(value, label, required, language, ...customValidators);
}
