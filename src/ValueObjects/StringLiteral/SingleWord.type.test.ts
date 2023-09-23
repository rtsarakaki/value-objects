import { describe, expect, test } from '@jest/globals';
import { createSingleWord } from './SingleWord.type';

test.todo('convert test to test.each model');

describe('SingleWord value object', () => {
	test('Valid SingleWord Values.', () => {
		const arrayOfValidNames = [
			{ word: 'Ricardo', result: 'ricardo' },
			{ word: 'SINGLE-WORD', result: 'single-word' },
			{ word: 'SINGLE_WORD', result: 'single_word' },
			{ word: 'SINGLE.WORD', result: 'single.word' },
			{ word: 'SINGLE,WORD', result: 'single,word' },
			{ word: 'SINGLE;WORD', result: 'single;word' },
			{ word: 'SINGLE&WORD', result: 'single&word' },
			{ word: 'SINGLE+WORD', result: 'single+word' },
			{ word: 'SINGLE|WORD', result: 'single|word' },
			{ word: '    SINGLE|WORD   ', result: 'single|word' },
		]

		arrayOfValidNames.map(({ word, result }) => {
			const title = createSingleWord(word, "SingleWord")
			expect(title.value).toBe(result)
			expect(title.errors.length).toBe(0)
		})
	})

	test('Invalid SingleWord Values', () => {
		const arrayOfInvalidNames = [
			{ word: '' },
			{ word: 'a b' },
			{ word: 'two words' },
			{ word: null },
			{ word: undefined },
			{ word: 1000 },
		]

		arrayOfInvalidNames.map(({ word }) => {
			const fullName = createSingleWord(word as string, "SingleWord")
			expect(fullName.errors.length).toBeGreaterThan(0)
		})
	})

	test('Create SingleWord withou pass the label', () => {
		const fullName = createSingleWord('Test')
		expect(fullName.errors.length).toEqual(0)
	})
})