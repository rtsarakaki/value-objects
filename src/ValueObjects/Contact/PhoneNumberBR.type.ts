import { GenericType, GenericValidation } from "../../Types";
import { CannotBeBlank } from "../../Validations";
import { IsValidPhoneNumberBR, normalizePhoneNumber } from "../../Validations/IsValidPhoneNumberBR.validation";
import { DDD } from "./DDD.type";

export class PhoneNumberBR extends GenericType {

	DDD: DDD = new DDD('')
 
	constructor(value: string, label: string | null = null, required: boolean = true, language: string = 'en-US', ...customValidators: GenericValidation[]) {
		super(value);

		const msg = label ?? 'Phone';

		const normalizedPhoneNumber = normalizePhoneNumber(value)

		const defaultValidators = [
			() => CannotBeBlank(value, msg, required, language),
			() => IsValidPhoneNumberBR(normalizedPhoneNumber as string, msg, required, language),
		];
		const validators = customValidators.length > 0 ? [...defaultValidators, ...customValidators] : defaultValidators;
		this.validate(validators);

		if(this.errors.length === 0) {
			const phoneNumberCleaned = normalizedPhoneNumber as string
			this.DDD = new DDD(phoneNumberCleaned.substring(0, 2))
			this.value = formatPhoneNumberBR(phoneNumberCleaned)
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

const phoneNumberBR = new PhoneNumberBR('11987654321')
console.log(phoneNumberBR)