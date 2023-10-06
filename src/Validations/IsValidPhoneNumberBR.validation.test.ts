
import { describe, expect, test } from '@jest/globals';
import { InvalidValue } from "../Errors";
import { IsValidPhoneNumberBR } from "./IsValidPhoneNumberBR.validation";

describe('Testing valid numbers', () => {
	const validPhoneNumbers = [
		'(11) 91234-5678',
		'(11) 9234-5678',
		'(12) 91234-5678',
		'(73) 91234-5678',
		'(74) 91234-5678',
		'(75) 91234-5678',
		'(77) 91234-5678',
		'(79) 91234-5678',
		'(98) 91234-5678',
		'(11) 2345-6789', // valid fixed phone number
		'(21) 2345-6789', // valid fixed phone number
	];

	validPhoneNumbers.forEach((phoneNumber) => {
		test(`should return null for a valid phone number: ${phoneNumber}`, () => {
			const result = IsValidPhoneNumberBR(phoneNumber, 'Phone number');
			expect(result).toBeNull();
		});
	});
});

describe('Testing invalid numbers', () => {
	const invalidPhoneNumbers = [
		'91234-5678',
		'(11) 1234-5678',
		'(11) 2345-67890',
		'(21) 2345-67890',
		'(11) 91234-56789',
		'(99) 91234-5678',
		'(00) 91234-5678',
		'(10) 91234-5678',
		'(20) 91234-5678',
		'(70) 91234-5678',
		'(80) 91234-5678',
		'(90) 91234-5678',
		'abc',
		'',
		null,
		undefined,
		1234567890,
		'(11) 2345-678',
		'(11) 2345-678',
		'(21) 2345-678'
	];
	invalidPhoneNumbers.forEach((phoneNumber) => {
		test(`should return an error for an invalid phone number: ${phoneNumber}`, () => {
			const result = IsValidPhoneNumberBR(phoneNumber as string, 'Phone number');
			expect(result).not.toBeNull();
			// expect(result?.message).toBe('Phone number is invalid.');
		});
	});
});

test('should return null for an empty optional input', () => {
	const result = IsValidPhoneNumberBR('', 'Phone number', false);
	expect(result).toBeNull();
});

test('should return an error for a required empty input', () => {
	const result = IsValidPhoneNumberBR('', 'Phone number', true);
	expect(result).not.toBeNull();
	expect(result?.message).toBe('Phone number is not a valid mobile phone number in Brazil.');
});
