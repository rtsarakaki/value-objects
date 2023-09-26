import { describe, expect, test } from '@jest/globals';
import { InvalidValue } from '../Errors';
import { IsValidDate } from './IsValidDate.validation';

describe('Test a list of valid dates', () => {
	const arrayOfValidDates = [
		{ value: '09/25/2023', label: 'format US' },
		{ value: '2023/09/25', label: 'year month day' },
		{ value: '2023-09-25', label: 'year month day' },
		{ value: '2023-09-01T14:55:00.000Z', label: 'year month day' },
	]

	test.each(arrayOfValidDates)('$value is a valid date.', ({ value, label }) => {
		const result = IsValidDate(value, label)
		expect(result).toBeNull()
	});
});

describe('Test a list of invalid dates', () => {
	const arrayOfValidDates = [
		{ value: '32/09/2023', label: 'format BR' },
		{ value: '13/25/2023', label: 'format US' },
		{ value: 'text', label: 'year month day' },
		{ value: 20230101, label: 'year month day' },
		{ value: null, label: 'year month day' },
	]

	test.each(arrayOfValidDates)('$value is an invalid date.', ({ value, label }) => {
		const result = IsValidDate(value as string, label)
		expect(result).toBeInstanceOf(InvalidValue)
	});
});

describe('Test a list of invalid labels.', () => {
	const arrayOfInvalidLabels = [
		null,
		undefined,
		0,
		'',
		'     '
	]

	describe.each(arrayOfInvalidLabels)('"%s" is an invalid label.', (label) => {

		const result = IsValidDate('North', label as string)
		test(`Returns an invalid value error.`, () => {
			expect(result).toBeInstanceOf(InvalidValue)
		});

		test(`Returned error message is "Label cannot be empty.".`, () => {
			expect(result?.message).toEqual('Label cannot be empty.')
		});
	})
})
