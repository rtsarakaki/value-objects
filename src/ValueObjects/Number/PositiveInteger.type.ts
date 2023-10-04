import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank } from "../../Validations";
import { IsPositiveInteger } from "../../Validations/IsPositiveInteger.validation";

export class PositiveInteger extends GenericType {
	constructor(value: number | string, label: string, required: boolean = true, language: string = 'en-US',  ...customValidators: GenericValidation[]) {
		const msg = label ?? 'Positive Integer';
		super(value);
		const defaultValidators = [
			() => CannotBeBlank(value as string, msg, required, language),
			() => IsPositiveInteger(value, msg, required, language),
		]
		const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
		this.validate(validators);

		if (this.errors.length === 0) {
			this.value = parseInt(value.toString());
		}

	}
}

export function createPositiveInteger(value: number | string, label: string) {
	return new PositiveInteger(value, label);
}
