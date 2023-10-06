import { describe, expect, test } from '@jest/globals';
import { PhoneNumberBR } from './PhoneNumberBR.type'
import { normalizePhoneNumber } from '../../Validations/IsValidPhoneNumberBR.validation';

describe(`Testing valid phone numbers`, () => {
	const arrayOfValidPhoneNumbers = [
		{ value: '11999999999', expected: '(11) 99999-9999' },
		{ value: '2199999999', expected: '(21) 9999-9999' },
		{ value: '31999999999', expected: '(31) 99999-9999' },
		{ value: '4199999999', expected: '(41) 9999-9999' },
		{ value: '51999999999', expected: '(51) 99999-9999' },
		{ value: '6199999999', expected: '(61) 9999-9999' },
		{ value: '71999999999', expected: '(71) 99999-9999' },
		{ value: '8199999999', expected: '(81) 9999-9999' },
		{ value: '91999999999', expected: '(91) 99999-9999' },
	];

	describe.each(arrayOfValidPhoneNumbers)(`%p is a valid phone number.`, ({ value, expected }) => {
		const result = new PhoneNumberBR(value, 'fix label', true);

		test(`No errors found.`, () => {
			expect(result.errors.length).toEqual(0);
		});

		test(`Formatted correctly.`, () => {
			expect(result.value).toEqual(expected);
		});
	});
});

describe(`Testing invalid phone numbers`, () => {
	const arrayOfInvalidPhoneNumbers = [
		{ value: '', label: '' },
		{ value: '123', label: '' },
		{ value: '12345678901234567890', label: '' },
		{ value: 'abcdefghijk', label: '' },
	];

	describe.each(arrayOfInvalidPhoneNumbers)(`%p is an invalid phone number.`, ({ value, label }) => {
		const result = new PhoneNumberBR(value, label, true);

		test(`${result.errors.length} errors found.`, () => {
			expect(result.errors.length).toBeGreaterThan(0);
		});
	});
});

describe(`Testing normalizePhoneNumber`, () => {
	const arrayOfPhoneNumbers = [
		{ value: '11999999999', expected: '11999999999' },
		{ value: '11 99999-9999', expected: '11999999999' },
		{ value: '11-99999-9999', expected: '11999999999' },
		{ value: '(11) 99999-9999', expected: '11999999999' },
		{ value: '11.99999.9999', expected: '11999999999' },
		{ value: '11 999999999', expected: '11999999999' },
		{ value: '11-999999999', expected: '11999999999' },
		{ value: '(11) 999999999', expected: '11999999999' },
		{ value: '11.99999999', expected: '1199999999' },
	];

	describe.each(arrayOfPhoneNumbers)(`%p is normalized to %p.`, ({ value, expected }) => {
		const result = normalizePhoneNumber(value);

		test(`Normalized correctly.`, () => {
			expect(result).toEqual(expected);
		});
	});
});

