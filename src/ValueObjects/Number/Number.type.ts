import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank } from "../../Validations";
import { IsValidNumber } from "../../Validations/IsValidNumber.validation";

export class Number extends GenericType {
	constructor(value: number | string, label: string, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
		const msg = label ?? 'Number';
		super(value);
		const defaultValidators = [
			() => CannotBeBlank(value as string, msg, required, language),
			() => IsValidNumber(value, msg, required, language),
		]
		const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
		this.validate(validators);

		if (this.errors.length === 0) {
			this.value = parseFloat(value.toString());
		}

	}
}

export function createNumber(value: number | string, label: string, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
	return new Number(value, label, required, language, ...customValidators);
}
