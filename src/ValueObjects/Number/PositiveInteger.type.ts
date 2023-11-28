import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank, NumberCannotBeGreaterThan, NumberCannotBeLessThan } from "../../Validations";
import { IsPositiveInteger } from "../../Validations/IsPositiveInteger.validation";

export class PositiveInteger extends GenericType {
	constructor(value: number | string, label: string, required: boolean = true, maxNumber?: number, minNumber?: number, language: string = 'en-US', ...customValidators: GenericValidation[]) {
		const msg = label ?? 'Positive Integer';
		super(value);
		const valueAsString = value !== null && value !== undefined ? value.toString() : '';
		const defaultValidators = [
			() => CannotBeBlank(valueAsString, msg, required, language),
			() => IsPositiveInteger(value, msg, required, language),
			...maxNumber !== undefined && value != null ? [() => NumberCannotBeGreaterThan(valueAsString, msg, maxNumber, required, language)] : [],
			...minNumber !== undefined && value != null ? [() => NumberCannotBeLessThan(valueAsString, msg, minNumber, required, language)] : [],
		]
		const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
		this.validate(validators);

		if (this.errors.length === 0 && value) {
			this.value = parseInt(valueAsString);
		}

	}
}

export function createPositiveInteger(value: number | string, label: string, required: boolean = true, maxNumber?: number, minNumber?: number, language: string = 'en-US', ...customValidators: GenericValidation[]) {
	return new PositiveInteger(value, label, required, maxNumber, minNumber, language, ...customValidators);
}