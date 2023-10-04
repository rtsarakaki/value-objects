import { describe, expect, test } from '@jest/globals';
import { createNumber } from './Number.type';

describe('Testing a list of valid numbers', () => {
	const arrayOfValidNumbers = [
		{ number: 1 },
		{ number: 0 },
		{ number: "2000" },
		{ number: "2" },
		{ number: "3.0" },
	]

	describe.each(arrayOfValidNumbers)('"$number" is a valid number.', ({ number }) => {

		const stringNumber = createNumber(number, "number")

		test(`No errors found, so the "${number}" is valid.`, () => {
			expect(stringNumber.errors.length).toBe(0)
		});

		if (stringNumber.errors.length > 0) {
			describe('Listing errors', () => {
				stringNumber.errors.map((err: any) => {
					test.each(err.errors)(`${err.errors}`, (suberror) => {
						const result = true
						expect(result).toBeTruthy()
					});
				})
			});
		}
	})
})

describe('Testing a list of invalid numbers', () => {
	const arrayOfValidNumbers = [
		{ number: "" },
		{ number: null },
		{ number: undefined },
		{ number: '   x1  ' },
		{ number: "1,01,000.99" },
		{ number: "1234.123,12" },
		{ number: "1234,123.12" },
		{ number: "12.123.01" },
	]

	describe.each(arrayOfValidNumbers)('"$number" is an invalid number.', ({ number: testNumber }) => {

		const number = createNumber(testNumber as string, "number")

		test(`${number.errors.length} errors found, so "${testNumber}" is invalid.`, () => {
			expect(number.errors.length).toBeGreaterThan(0)
		});

		if (number.errors.length > 0) {
			describe('Listing errors', () => {
				test.each(number.errors)(`%p`, (error) => {
					const result = true
					expect(result).toBeTruthy()
				});
			});
		}
	})
})
