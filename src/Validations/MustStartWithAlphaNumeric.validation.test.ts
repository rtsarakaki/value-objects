import { describe, expect, test } from '@jest/globals';
import { InvalidValue } from '../Errors';
import { MustStartWithAlphaNumeric } from './MustStartWithAlphaNumeric.validation';


describe('Invalid values', () => {
	const arrayOfValidValues = [
		{ value: '-', label: 'any label' },
		{ value: '-123', label: 'any label' },
		{ value: '-abc', label: 'any label' },
		{ value: '&asdf', label: 'any label' },
		{ value: 0, label: 'any label' },
		{ value: null, label: 'any label' },
		{ value: undefined, label: 'any label' },
	]
	describe.each(arrayOfValidValues)(`%p`, ({ value, label }) => {

		const result = MustStartWithAlphaNumeric(value as string, label)

		test(`%p must return an InvalidValue error.`, () => {
			expect(result).toBeInstanceOf(InvalidValue)
		})

		test(`Error message is ${result?.message}.`, () => {
			expect(result?.message).toEqual(`${label} must start with a letter or number.`)
		})

	});
});


describe('Valid values', () => {
	const arrayOfValidValues = [
		{ value: 'a', label: 'any label' },
		{ value: '1', label: 'any label' },
		{ value: 'a1', label: 'any label' },
		{ value: 'A', label: 'any label' },
		{ value: 'Z', label: 'any label' },
		{ value: '0', label: 'any label' },
		{ value: '9', label: 'any label' },
		{ value: 'aBc123', label: 'any label' },
		{ value: 'a b c', label: 'any label' },
		{ value: '  a b c  ', label: 'any label' },
		{ value: '  a-b$.c  ', label: 'any label' },
	];
	describe.each(arrayOfValidValues)(`%p`, ({ value, label }) => {
		const result = MustStartWithAlphaNumeric(value as string, label);
		test(`%p must return null.`, () => {
			expect(result).toBeNull();
		});
	});
});

describe('Invalid label', () => {
	const arrayOfInvalidLabels = [
		null,
		undefined,
		0,
		'',
		'     '
	]

	test.each(arrayOfInvalidLabels)(`%p is valid.`, (label) => {
		const result = MustStartWithAlphaNumeric('ok', label as string)
		expect(result).toBeInstanceOf(InvalidValue)
		expect(result?.message).toEqual('Label cannot be empty.')
	})
})

