import { describe, expect, test } from '@jest/globals';
import { InvalidValue } from '../Errors';
import { CannotBeBlank } from './CannotBeBlank.validation';

describe('Invalid values', () => {
	const arrayOfInvalidValues = [
		{ value: '', label: 'name' },
		{ value: ' ', label: 'name' },
		{ value: '      ', label: 'name' },
		{ value: '\n', label: 'name' },
		{ value: null, label: 'code' },
		{ value: undefined, label: 'code' },
		{ value: 1, label: 'code' },
		{
			value: `
			`, label: 'name'
		},
		{
			value: `
			     `, label: 'name'
		}
	]

	describe.each(arrayOfInvalidValues)(`Testing %p.`, ({ value, label }) => {
		const result = CannotBeBlank(value as string, label, true)

		test(`${value} is valid`, () => {
			expect(result).toBeInstanceOf(InvalidValue)
		});

		test(`${value} is valid`, () => {
			expect(result?.message).toEqual(`${label} cannot be blank.`)
		});
	});
})


describe('Valid values', () => {
	const arrayOfInvalidValues = [
		{ value: 'not empty string', label: 'name' },
		{ value: '.', label: 'name' },
		{ value: '@', label: 'other' },
		{ value: '1', label: 'number' },
		{ value: ' 1', label: 'name' },
		{ value: ' a ', label: 'name' },
		{ value: ' v a l u e ', label: 'name' },
		{ value: ' ~', label: 'name' },
		{ value: '""', label: 'name' },
		{ value: "''", label: 'name' },
		{ value: '<br>', label: 'name' },
		{ value: 'UPERCASE VALUE', label: 'any text' },
	]

	test.each(arrayOfInvalidValues)(`%p is valid.`, ({ value, label }) => {
		const result = CannotBeBlank(value, label)
		expect(result).toBeNull()
	});
})

describe('Invalid label', () => {
	const arrayOfValidLabels = [
		null,
		undefined,
		0,
		'',
		'     '
	]

	describe.each(arrayOfValidLabels)(`Testing invalid label %p.`, (label) => {

		const result = CannotBeBlank('North', label as string, true)

		test(`Generate an InvalidValue error.`, () => {
			expect(result).toBeInstanceOf(InvalidValue)
		})
		test(`Generate an InvalidValue error.`, () => {
			expect(result?.message).toEqual('Label cannot be empty.')
		})
	});

})
