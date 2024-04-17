import { describe, expect, test } from '@jest/globals';
import { DDD } from './DDD.type'
import { normalizePhoneNumber } from '../../Validations/IsValidPhoneNumberBR.validation';

describe(`Testing valid DDDs`, () => {
	const arrayOfValidDDD = [
		{ value: '11', expected: '(11)' },
		{ value: '21', expected: '(21)' },
		{ value: '31', expected: '(31)' },
		{ value: '41', expected: '(41)' },
		{ value: '51', expected: '(51)' },
		{ value: '61', expected: '(61)' },
		{ value: '71', expected: '(71)' },
		{ value: '81', expected: '(81)' },
		{ value: '91', expected: '(91)' },
	];

	describe.each(arrayOfValidDDD)(`%p is a valid DDD.`, ({ value, expected }) => {
		const result = new DDD(value, 'fix label', true);

		test(`No errors found.`, () => {
			expect(result.errors.length).toEqual(0);
		});

		test(`Formatted correctly.`, () => {
			expect(result.getFormated()).toEqual(expected);
		});
	});
});

describe(`Testing invalid DDDs`, () => {
	const arrayOfInvalidDDD = [
		{ value: '', label: '' },
		{ value: '123', label: '' },
		{ value: '12345678901234567890', label: '' },
		{ value: 'abcdefghijk', label: '' },
		{ value: '10', label: '' },
		{ value: '1', label: '' },
		{ value: '00', label: '' },
	];

	describe.each(arrayOfInvalidDDD)(`%p is an invalid DDD.`, ({ value, label }) => {
		const result = new DDD(value, label, true);

		test(`${result.errors.length} errors found.`, () => {
			expect(result.errors.length).toBeGreaterThan(0);
		});
	});
});

