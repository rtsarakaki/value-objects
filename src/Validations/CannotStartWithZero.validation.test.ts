import { describe, expect, test } from '@jest/globals';
import InvalidValue from '../Errors/InvalidValue.error';
import { CannotStartWithZero } from './CannotStartWithZero.validation';

describe('CannotStartWithZero', () => {

	test('Invalid values', () => {
		const invalidValues = [
			{ value: '0123456', label: 'name' },
			{ value: '0abc', label: 'name' },
			{ value: '0', label: 'name' },
			{ value: ' 0', label: 'name' },
			{ value: null, label: 'code' },
			{ value: undefined, label: 'code' },
			{ value: 1, label: 'code' },

		]

		invalidValues.map(({ value, label }) => {
			const result = CannotStartWithZero(value as string, label)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual(`${label} cannot start with zero.`)
		})
	})

	test('Valid values', () => {
		const validValues = [
			{ value: '12345', label: 'name' },
			{ value: ' a b ', label: 'code' },
			{ value: ' ... ', label: 'code' },
			{ value: '@', label: 'code' },
			{ value: 'zero', label: 'code' },
			{ value: 'o', label: 'code' },
			{ value: 'O', label: 'code' },
			{
				value: `a
			b
			c e f ghjklm 1 2 3 @`, label: 'code'
			},
		]

		validValues.map(({ value, label }) => {
			const result = CannotStartWithZero(value, label)
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
			const result = CannotStartWithZero('North', label as string)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual('Label cannot be empty.')
		})
	})

}) 