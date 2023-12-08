import { GenericType, GenericValidation } from "../../Types";
import { MustHaveAtLeastXLetters } from "../../Validations";
import { CannotBeBlank } from "../../Validations/CannotBeBlank.validation";
import { CannotRepeatCharInSequenceFourTimes } from "../../Validations/CannotRepeatCharInSequenceFourTimes.validation";

export class LongDescription extends GenericType {
	constructor(
		value: string,
		label: string,
		required = true,
		language: string = "en-US",
		...customValidators: GenericValidation[]
	) {
		const msg = label ?? "Long Description";
		super(value);
		const defaultValidators = [
			() => CannotBeBlank(value, msg, required, language),
			() => MustHaveAtLeastXLetters(value, msg, 30, required, language),
			() => CannotRepeatCharInSequenceFourTimes(value, msg, required, language),
		];
		const validators =
			customValidators.length > 0
				? [...defaultValidators, ...customValidators]
				: defaultValidators;
		this.validate(validators);
		if (this.errors.length === 0) {
			this.value = value.trim();
		}
	}
}

export function createLongDescription(
	value: string,
	label: string,
	required: boolean = true,
	language: string = "en-US",
	...customValidators: GenericValidation[]
) {
	return new LongDescription(
		value,
		label,
		required,
		language,
		...customValidators,
	);
}
