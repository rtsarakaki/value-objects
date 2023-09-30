import { GenericType, GenericValidation } from "../../Types";
import { IsValidNumber } from "../../Validations/IsValidNumber.validation";

export class Number extends GenericType {
	constructor(value: number | string, label: string, required = true, ...customValidators: GenericValidation[]) {
		const msg = label ?? 'Number';
		super(value);
		const defaultValidators = [
			() => IsValidNumber(value, msg),
		]
		const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
		this.validate(validators);

		if (this.errors.length === 0) {
			this.value = parseFloat(value.toString());
		}

	}
}

export function createNumber(value: number | string, label: string) {
	return new Number(value, label);
}
