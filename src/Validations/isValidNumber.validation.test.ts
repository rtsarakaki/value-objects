import { describe, expect, test } from '@jest/globals';
import { InvalidValue } from "../Errors";
import { IsValidNumber, convertStringToNumber } from "./IsValidNumber.validation";

describe(`Testing valid values`, () => {
	const arrayOfValidValues = [
		{ value: '+1', expected: 1 },
		{ value: '-21', expected: -21 },
		{ value: '-0', expected: 0 },
		{ value: '+0', expected: 0 },
		{ value: '+01.00', expected: 1 },
		{ value: '+01.01', expected: 1.01 },
		{ value: '-01.01', expected: -1.01 },
		{ value: '-01,000.01', expected: -1000.01 },
	]

	describe.each(arrayOfValidValues)(`Convert valid string '%p' to number.`, ({ value, expected }) => {

		const result = convertStringToNumber(value)
		test(`'${result}' is a valid number and atends the expected value '${expected}'`, () => {
			expect(result).toEqual(expected)
		});

		const isValidNumberResult = IsValidNumber(value, "number label")
		test(`IsValidNumber tested and return no errors.`, () => {
			expect(isValidNumberResult).toBeNull()
		});
	});
});


describe(`Testing invalid values`, () => {
	const arrayOfInvalidValues = [
		{ value: '+1.' },
		{ value: 'x' },
		{ value: '-' },
		{ value: '1000,000.00' },
		{ value: '1000.000.00' },
		{ value: '100.0.000.00' },
		{ value: '1,000.000.00' },
	]
	describe.each(arrayOfInvalidValues)(`Convert invalid string %p to number.`, ({ value }) => {

		const result = convertStringToNumber(value)
		test(`'${value} results in ${result}' and is an invalid number.`, () => {
			expect(result).toBeInstanceOf(InvalidValue)
		});
	});
});