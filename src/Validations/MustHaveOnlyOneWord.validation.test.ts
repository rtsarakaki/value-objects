import { describe, expect, test } from '@jest/globals';
import InvalidValue from '../Errors/InvalidValue.error';
import { MustHaveOnlyOneWord } from './MustHaveOnlyOneWord.validation';

describe('MustHaveOnlyOneWord', () => {

	test('Invalid values', () => {
		const invalidValues = [
			{ value: '0123456O .', label: 'name' },
			{ value: 'one word', label: 'name' },
			{ value: 'one	word', label: 'name' },
			{ value: `one
			word`, label: 'name' },
		]

		invalidValues.map(({ value, label }) => {
			const result = MustHaveOnlyOneWord(value as string, label)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual(`${label}  cannot contain spaces.`)
		})
	})

	test('Valid values', () => {
		const validValues = [
			{ value: '12345', label: 'name' },
			{ value: '0.0', label: 'name' },
			{ value: '.0', label: 'name' },
			{ value: '1000.0', label: 'name' },
			{ value: ' 0123 ', label: 'name' },
			{ value: ' one-word ', label: 'name' },
			{ value: ' one_word ', label: 'name' },
			{ value: ' oneword ', label: 'name' },
			{ value: ' one.word ', label: 'name' },
			{ value: ' one,word ', label: 'name' },
			{ value: ' one|word ', label: 'name' },
			{ value: ' one&word ', label: 'name' },
			{ value: ' one$word ', label: 'name' },
			{ value: ' ONE$word ', label: 'name' },
			{ value: ' ONE=WORD ', label: 'name' },
		]

		validValues.map(({ value, label }) => {
			const result = MustHaveOnlyOneWord(value, label)
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
			const result = MustHaveOnlyOneWord('North', label as string)
			expect(result).toBeInstanceOf(InvalidValue)
			expect(result?.message).toEqual('Label cannot be empty.')
		})
	})

}) 