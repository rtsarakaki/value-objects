import { describe, expect, test } from '@jest/globals';
import { createShortDescription } from './ShortDescription.type';

describe('ShortDescription value object', () => {
	test('Valid ShortDescription Values.', () => {
		const arrayOfValidNames = [
			{ value: 'Ricardo', result: 'Ricardo' },
			{ value: "That's my title", result: "That's my title" },
			{ value: "Welcome back, Ricardo Tadeu Sinhei Arakaki", result: "Welcome back, Ricardo Tadeu Sinhei Arakaki" },
			{ value: "Hi", result: "Hi" },
			{ value: "hello world!", result: "hello world!" },
			{ value: "       hello world!", result: "hello world!" },
			{ value: "       hello world!         ", result: "hello world!" },
			{ value: "titulo de um artigo.", result: "titulo de um artigo." },
			{ value: "Piece of cake!!!", result: "Piece of cake!!!" },
			{ value: '0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789        ', result: '0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789' },
		]

		arrayOfValidNames.map(({ value, result }) => {
			const description = createShortDescription(value, "Short Description")
			console.log(description)
			expect(description.value).toBe(result)
			expect(description.errors.length).toBe(0)
		})
	})

	test('Invalid ShortDescription Values', () => {
		const arrayOfInvalidNames = [
			{ value: '' },
			{ value: '          ' },
			{ value: 'a' },
			{ value: ' a ' },
			{ value: null },
			{ value: undefined },
			{ value: 1000 },
			{ value: '0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 ', result: 1 },
		]

		arrayOfInvalidNames.map(({ value, result }) => {
			const description = createShortDescription(value as string, "Short Description")
			expect(description.errors.length).toBeGreaterThan(0)
		})
	})
})