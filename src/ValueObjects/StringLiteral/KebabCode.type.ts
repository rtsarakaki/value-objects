import { GenericType, GenericValidation } from "../../Types";
import {
  CannotBeBlank,
  CannotHaveMoreThanXCharacters,
  MustEndWithAlphaNumeric,
  MustHaveAtLeastXLetters,
  MustHaveOnlyOneWord,
  MustStartWithAlphaNumeric,
  RegexMatch
} from "../../Validations";

export class KebabCode extends GenericType {
	constructor(
		value: string,
		label: string | null = null,
		required = true,
		language: string = "en-US",
		...customValidators: GenericValidation[]
	) {
		const msg = label ?? "Kebab Code";
		super(value);
		const formatedValue = formatValue(value);
		const defaultValidators = [
			() => CannotBeBlank(formatedValue, msg, required, language),
			() => MustHaveAtLeastXLetters(value, msg, 2, required, language),
			() =>
				CannotHaveMoreThanXCharacters(
					formatedValue,
					msg,
					50,
					required,
					language,
				),
			() => MustHaveOnlyOneWord(value, msg, required, language),
			() =>
				MustStartWithAlphaNumeric(formatedValue, msg, required, language),
			() => MustEndWithAlphaNumeric(formatedValue, msg, required, language),
			() =>
				RegexMatch(
					formatedValue,
					msg,
					"^[a-z0-9]+(-[a-z0-9]+)*$",
					"must contain only letters, numbers or non-consecutive dashes",
					required,
					language,
				),
		];
		const validators =
			customValidators.length > 0
				? [...defaultValidators, ...customValidators]
				: defaultValidators;
		this.validate(validators);
		if (this.errors.length === 0) {
			this.value = formatedValue;
		}
	}
}

function formatValue(value: string) {
	if (value === null) return "";
	if (value === undefined) return "";
	return value.toString().trim().toLowerCase();
}

export function createKebabCode(
	value: string,
	label: string | null = null,
	required: boolean = true,
	language: string = "en-US",
	...customValidators: GenericValidation[]
) {
	return new KebabCode(value, label, required, language, ...customValidators);
}
