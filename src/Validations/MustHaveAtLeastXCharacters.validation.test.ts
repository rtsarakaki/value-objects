import { describe, expect, test } from '@jest/globals';
import { InvalidValue } from '../Errors/InvalidValue.error';
import { MustHaveAtLeastXCharacters } from './MustHaveAtLeastXCharacters.validation';

test.todo('convert test to test.each model');

describe('MustHaveAtLeastXCharacters', () => {

	test('Invalid values', () => {
		const invalidValues = [
			{ value: '', label: 'name', length: 1 },
			{ value: '123456', label: 'name', length: 7 },
			{ value: 'a b', label: 'code', length: 4 },
			{ value: null, label: 'code', length: 4 },
			{ value: undefined, label: 'code', length: 4 },
			{ value: 1, label: 'code', length: 4 },
			{ value: null, label: 'code', length: 4 },
			{ value: undefined, label: 'code', length: 4 },
			{ value: 1, label: 'code', length: 4 },
			{
				value: `a
			b
			c e f ghjklmn 1 2 3 @`, label: 'code', length: 32
			},
		]

		invalidValues.map(({ value, label, length }) => {
			const result = MustHaveAtLeastXCharacters(value as string, label, length)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual(`${label} must have at least  ${length}  characters.`)
		})
	})

	test('Valid values', () => {
		const validValues = [
			{ value: '12345', label: 'name', length: 5 },
			{ value: '', label: 'name', length: 0 },
			{ value: ' a b c', label: 'code', length: 5 },
			{ value: ' .... ', label: 'code', length: 3 },
			{
				value: `a
			b
			c e f ghjklmn 1 2 3 @`, label: 'code', length: 30
			},
		]

		validValues.map(({ value, label, length }) => {
			const result = MustHaveAtLeastXCharacters(value, label, length)
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
			const result = MustHaveAtLeastXCharacters('North', label as string, 0)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual('Label cannot be empty.')
		})
	})

}) 