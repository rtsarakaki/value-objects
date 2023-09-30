import { describe, expect, test } from '@jest/globals';
import { IsPositiveInteger } from './IsPositiveInteger.validation';
import { InvalidValue } from '../Errors';

describe('Test a list of valid numbers', () => {
	const arrayOfValidNumbers = [
		{ value: 0, label: 'zero' },
		{ value: +0, label: 'plus zero' },
		{ value: -0, label: 'minus zero' },
		{ value: "+1.000,000", label: 'thousand' },
		{ value: "10.00", label: 'decimals' },
	]

	test.each(arrayOfValidNumbers)('$value is a positive integer.', ({ value, label }) => {
		const result = IsPositiveInteger(value, label)
		expect(result).toBeNull()
	});
});

describe('Test a list of invalid numbers', () => {
	const arrayOfValidNumbers = [
		null,
		undefined,
		'-1',
		'   x1  ',
		'1,1',
		1.5,
		-1.5,
		"1,0000.0",
		"1.0000,0",
		"1.00.00,0",
		"1000.000.000,0",
	]

	describe.each(arrayOfValidNumbers)('"%p" is an invalid number.', ( number ) => {

		const positiveInteger = IsPositiveInteger(number as string, "numbe label")

		test(`${positiveInteger} error found, so the "${number}" is invalid.`, () => {
			expect(positiveInteger).toBeInstanceOf(InvalidValue)
		});
		
		test(`${positiveInteger?.message} errors found, so the "${number}" is invalid.`, () => {
			expect(positiveInteger?.message).not.toBeNull()
		});
	})
});
