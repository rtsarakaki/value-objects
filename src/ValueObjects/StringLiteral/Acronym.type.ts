import { GenericType, GenericValidation } from "../../Types";
import {
	CannotBeBlank,
	CannotHaveMoreThanXCharacters,
	MustHaveAtLeastXLetters,
	MustHaveOnlyOneWord
} from "../../Validations";

export class Acronym extends GenericType {
	constructor(
		value: string,
		label?: string,
		required?: boolean,
		upper?: boolean,
		language?: string,
		...customValidators: GenericValidation[]
	) {
		const _label = label || "Acronym";
		const _required = required ?? false;
		const _upper = upper ?? true;
		const _language = language || "en-US";
		super(value);
		const formatedValue = formatValue(value, _upper);
		const defaultValidators = [
			() => CannotBeBlank(formatedValue, _label, _required, _language),
			() => MustHaveAtLeastXLetters(value, _label, 2, required, language),
			() =>
				CannotHaveMoreThanXCharacters(
					formatedValue,
					_label,
					5,
					_required,
					_language,
				),
			() => MustHaveOnlyOneWord(value, _label, _required, _language),
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

function formatValue(value: string, upperCase: boolean) {
	if (value === null) return "";
	if (value === undefined) return "";
	return upperCase
		? value.toString().trim().toUpperCase()
		: value.toString().trim().toLowerCase();
}

export function createAcronymCode(
	value: string,
	label?: string,
	required: boolean = true,
	upper: boolean = true,
	language: string = "en-US",
	...customValidators: GenericValidation[]
) {
	return new Acronym(
		value,
		label,
		required,
		upper,
		language,
		...customValidators,
	);
}
