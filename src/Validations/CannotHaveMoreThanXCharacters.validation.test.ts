import { describe, expect, test } from '@jest/globals';
import InvalidValue from '../Errors/InvalidValue.error';
import { CannotHaveMoreThanXCharacters } from './CannotHaveMoreThanXCharacters.validation';

test.todo('convert test to test.each model');

describe('CannotHaveMoreThanXCharacters', () => {

	test('Invalid values', () => {
		const invalidValues = [
			{value: '123456', label: 'name', length: 5},
			{ value: 'a b', label: 'code', length: 2 },
			{ value: null, label: 'code', length: 2 },
			{ value: undefined, label: 'code', length: 2 },
			{ value: 1, label: 'code', length: 4 },

			{ value: `a
			b
			c e f ghjklmn 1 2 3 @`, label: 'code', length: 30 },
		]

		invalidValues.map(({value, label, length}) => {
			const result = CannotHaveMoreThanXCharacters(value as string, label, length)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual(`${label} cannot have more than  ${length }  characters.`)
		})
	})

	test('Valid values', () => {
		const validValues = [
			{ value: '12345', label: 'name', length: 5 },
			{ value: ' a b ', label: 'code', length: 3 },
			{ value: ' ... ', label: 'code', length: 3 },
			{
				value: `a
			b
			c e f ghjklm 1 2 3 @`, label: 'code', length: 30
			},
		]

		validValues.map(({ value, label, length }) => {
			const result = CannotHaveMoreThanXCharacters(value, label, length)
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
			const result = CannotHaveMoreThanXCharacters('North', label as string, 1)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual('Label cannot be empty.')
		})
	})


}) 