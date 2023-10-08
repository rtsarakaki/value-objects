import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank } from "../../Validations";
import { IsValidPhoneNumberBR, normalizePhoneNumber } from "../../Validations/IsValidPhoneNumberBR.validation";

export class PhoneNumberBR extends GenericType {
	constructor(value: string, label: string | null = null, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
		super(value);

		const msg = label ?? 'Email';

		const normalizedPhoneNumber = normalizePhoneNumber(value)

		const defaultValidators = [
			() => CannotBeBlank(value, msg, required, language),
			() => IsValidPhoneNumberBR(normalizedPhoneNumber as string, msg, required, language),
		];
		const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
		this.validate(validators);

		if(this.errors.length === 0) {
			this.value = formatPhoneNumberBR(normalizedPhoneNumber as string)
		}
	}
}

export function createPhoneNumberBR(value: string, label: string | null = null, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
	return new PhoneNumberBR(value, label, required, language, ...customValidators);
}

export function formatPhoneNumberBR(phoneNumber: string): string {
	const phoneNumberRegex = /^(\d{2})(\d{4,5})(\d{4})$/;
	const matches = phoneNumber.match(phoneNumberRegex);
	if (matches) {
		return `(${matches[1]}) ${matches[2]}-${matches[3]}`;
	}
	return phoneNumber;
}