import { describe, expect, test } from '@jest/globals';
import InvalidValue from '../Errors/InvalidValue.error';
import { MustBeContainedInEnum } from './MustBeContainedInEnum.validation';

test.todo('convert test to test.each model');

enum CardinalDirections {
	North,
	East,
	South,
	West
}

describe('MustBeContainedInEnum', () => {

	test('Invalid values', () => {
		const invalidValues = [
			{ value: 'North_', label: 'CardinalDirections' },
			{ value: null, label: 'code' },
			{ value: undefined, label: 'code' },
			{ value: 1, label: 'code' },
		]

		invalidValues.map(({ value, label }) => {
			const result = MustBeContainedInEnum(value as string, label, CardinalDirections)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual(`${label}  must be among the following values ${JSON.stringify('model')}.`)
		})
	})

	test('Invalid enum', () => {
		const label = 'CardinalDirections'
		const result = MustBeContainedInEnum('North', label, null)
		expect(result).toBeInstanceOf(InvalidValue)
		expect(result?.message).toEqual('Enum is not valid.')
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
			const result = MustBeContainedInEnum('North', label as string, CardinalDirections)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual('Label cannot be empty.')
		})
	})

	test('Valid values', () => {
		const validValues = [
			{ value: 'North', label: 'CardinalDirections' },
			{ value: 'East', label: 'CardinalDirections' },
			{ value: 'South', label: 'CardinalDirections' },
			{ value: 'West', label: 'CardinalDirections' },
		]

		validValues.map(({ value, label }) => {
			const result = MustBeContainedInEnum(value, label, CardinalDirections)
			expect(result).toBeNull()
		})
	})

	test('Passing an invalid enum', () => {
		const result = MustBeContainedInEnum('a', 'b', undefined)
		expect(result).toBeInstanceOf(InvalidValue)
		expect(result?.message).toEqual('Enum is not valid.')
	})

}) 