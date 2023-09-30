import { describe, expect, test } from '@jest/globals';
import { createPositiveInteger } from './PositiveInteger.type';

describe('Testing a list of valid positive numbers', () => {
	const arrayOfValidNumbers = [
		{ number: 1 },
		{ number: 0 },
		{ number: "2000" },
		{ number: "2" },
		{ number: "3.0" },
	]

	describe.each(arrayOfValidNumbers)('"$number" is a valid positive number.', ({ number }) => {

		const positiveInteger = createPositiveInteger(number, "number")

		test(`No errors found, so the "${number}" is valid.`, () => {
			expect(positiveInteger.errors.length).toBe(0)
		});

		if (positiveInteger.errors.length > 0) {
			describe('Listing errors', () => {
				positiveInteger.errors.map((err: any) => {
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
		{ number: -1 },
		{ number: -1000 },
		{ number: "-2000" },
		{ number: "" },
		{ number: null },
		{ number: undefined },
		{ number: '-1' },
		{ number: '   x1  ' },
		{ number: '1,1' },
		{ number: '-1,1' },
		{ number: "-1.5" },
		{ number: -1.5 },
		{ number: 1.5 },
		{ number: "3.01" },
		{ number: "1,01,000.99" },
		{ number: "1234.123,12" },
		{ number: "1234,123.12" },
		{ number: "12.123.01" },
		{ number: "12.123,01" },
	]

	describe.each(arrayOfValidNumbers)('"$number" is an invalid positive number.', ({ number }) => {

		const positiveInteger = createPositiveInteger(number as string, "number")

		test(`${positiveInteger.errors.length} errors found, so "${number}" is invalid.`, () => {
			expect(positiveInteger.errors.length).toBeGreaterThan(0)
		});

		if (positiveInteger.errors.length > 0) {
			describe('Listing errors', () => {
				test.each(positiveInteger.errors)(`%p`, (error) => {
					const result = true
					expect(result).toBeTruthy()
				});
			});
		}
	})
})
