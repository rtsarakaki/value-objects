import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank } from "../../Validations";
import { IsValidNumber } from "../../Validations/IsValidNumber.validation";
import { NumberCannotBeGreaterThan } from "../../Validations/NumberCannotBeGreaterThan.validation";
import { NumberCannotBeLessThan } from "../../Validations/NumberCannotBeLessThan.validation";

export class Number extends GenericType {
	constructor(
		value: number | string | null | undefined,
		label: string,
		required: boolean = true,
		maxNumber?: number,
		minNumber?: number,
		language: string = "en-US",
		...customValidators: GenericValidation[]
	) {
		const msg = label ?? "Number";
		super(value);
		const valueAsString = value !== null && value !== undefined ? value.toString() : '';

		const defaultValidators = [
			() => CannotBeBlank(valueAsString, msg, required, language),
			() => IsValidNumber(valueAsString, msg, required, language),
			...(maxNumber !== undefined && value != null
				? [
						() =>
							NumberCannotBeGreaterThan(
								valueAsString,
								msg,
								maxNumber,
								required,
								language,
							),
				  ]
				: []),
			...(minNumber !== undefined && value != null
				? [
						() =>
							NumberCannotBeLessThan(
								valueAsString,
								msg,
								minNumber,
								required,
								language,
							),
				  ]
				: []),
		];
		const validators =
			customValidators.length > 0
				? [...defaultValidators, ...customValidators]
				: defaultValidators;
		this.validate(validators);

		if (this.errors.length === 0 && value) {
			this.value = parseFloat(valueAsString);
		}
	}
}

export function createNumber(
	value: number | string | null | undefined,
	label: string,
	required: boolean = true,
	maxNumber?: number,
	minNumber?: number,
	language: string = "en-US",
	...customValidators: GenericValidation[]
) {
	return new Number(
		value,
		label,
		required,
		maxNumber,
		minNumber,
		language,
		...customValidators,
	);
}
