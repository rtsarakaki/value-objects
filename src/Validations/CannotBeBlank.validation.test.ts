import { describe, expect, test } from '@jest/globals';
import{ InvalidValue } from '../Errors';
import { CannotBeBlank } from './CannotBeBlank.validation';

test.todo('convert test to test.each model');

test('Invalid values', () => {
	const invalidValues = [
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

	invalidValues.map(({ value, label }) => {
		const result = CannotBeBlank(value as string, label)
		expect(result).toBeInstanceOf(InvalidValue)
		expect(result?.message).toEqual(`${label} cannot be blank.`)
	})
})

test('Invalid values but ignore validation', () => {
	const invalidValues = [
		{ value: '', label: 'name' },
		{ value: ' ', label: 'name' },
		{ value: '      ', label: 'name' },
		{ value: '\n', label: 'name' },
		{
			value: `
			`, label: 'name'
		},
		{
			value: `
			     `, label: 'name'
		}
	]

	invalidValues.map(({ value, label }) => {
		const result = CannotBeBlank(value, label, false)
		expect(result).toBeNull()
	})
})

test('Valid values', () => {
	const validValues = [
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

	validValues.map(({ value, label }) => {
		const result = CannotBeBlank(value, label)
		expect(result).toBeNull()
	})
})

test('Invalid label', () => {
	const labels = [
		null,
		undefined,
		0,
		'',
		'     '
	]

	labels.map(label => {
		const result = CannotBeBlank('North', label as string)
		expect(result).toBeInstanceOf(InvalidValue)
		expect(result?.message).toEqual('Label cannot be empty.')
	})
})
