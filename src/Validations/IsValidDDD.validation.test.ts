
import { describe, expect, test } from '@jest/globals';
import { IsValidDDD } from "./IsValidDDD.validation";
import { DDD } from '../ValueObjects/Contact/DDD.type';

describe('Testing valid DDDs', () => {
	const validDDD = [
		'11',
		'(11)',
		'(12)',
		'(73)',
		'(74)',
		'(75)',
		'(77)',
		'(79)',
		'(98)',
		'(11)', // valid fixed phone number
		'(21)', // valid fixed phone number
	];

	const dddList = DDD.getDDDList();

	validDDD.forEach((DDD) => {
		test(`should return null for a valid DDD: ${DDD}`, () => {
			const result = IsValidDDD(DDD, 'DDD', dddList);
			expect(result).toBeNull();
		});
	});
});

describe('Testing invalid DDDs', () => {
	const invalidDDDs = [
		'',
		'(10)',
		'10',
		'1',
		'123',
		'(99) 91234-5678',
		'abc',
		'',
		null,
		undefined,
		1234567890,
	];
	invalidDDDs.forEach((phoneNumber) => {
		test(`should return an error for an invalid phone number: ${phoneNumber}`, () => {
			const result = IsValidDDD(phoneNumber as string, 'Phone number');
			expect(result).not.toBeNull();
			// expect(result?.message).toBe('Phone number is invalid.');
		});
	});
});

test('should return an error for a required empty input', () => {
	const result = IsValidDDD('', 'Phone number', true);
	expect(result).not.toBeNull();
	expect(result?.message).toBe('Phone number is not a valid phone number.');
});
