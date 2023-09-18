import { describe, expect, test } from '@jest/globals';
import InvalidValue from '../Errors/InvalidValue.error';
import { MustContainOnlyNumbers } from './MustContainOnlyNumbers.validation';

describe('MustContainOnlyNumbers', () => {

	test('Invalid values', () => {
		const invalidValues = [
			{ value: '0123456O', label: 'name' },
			{ value: '0abc', label: 'name' },
			{ value: '0k', label: 'name' },
			{ value: '1,0', label: 'name' },
			{ value: '1,000.00', label: 'name' },
			{ value: '176.1.0.12', label: 'ip' },
			{ value: '(11)', label: 'ddd' },
			{ value: '99999-9999', label: 'phone' },
			{ value: '1+1', label: 'sum' },
			{ value: 'one', label: 'text' },
			{ value: null, label: 'code' },
			{ value: undefined, label: 'code' },
			{ value: 1, label: 'code' },

		]

		invalidValues.map(({ value, label }) => {
			const result = MustContainOnlyNumbers(value as string, label)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual(`${label} must contain only numbers.`)
		})
	})

	test('Valid values', () => {
		const validValues = [
			{ value: '12345', label: 'name' },
			{ value: '0.0', label: 'name' },
			{ value: '.0', label: 'name' },
			{ value: '1000.0', label: 'name' },
			{ value: ' 0123 ', label: 'name' },
		]

		validValues.map(({ value, label }) => {
			const result = MustContainOnlyNumbers(value, label)
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
			const result = MustContainOnlyNumbers('North', label as string)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual('Label cannot be empty.')
		})
	})

}) 