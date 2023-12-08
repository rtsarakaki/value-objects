import { describe, expect, test } from '@jest/globals';
import { createShortDescription } from './ShortDescription.type';

describe('ShortDescription value object', () => {
	test('Valid ShortDescription Values.', () => {
		const arrayOfValidNames = [
			{ value: 'Ricardo tadeu sinhei arakaki', result: 'Ricardo tadeu sinhei arakaki' },
			{ value: "That's a short description", result: "That's a short description" },
			{ value: "Welcome back, Ricardo Tadeu Sinhei Arakaki", result: "Welcome back, Ricardo Tadeu Sinhei Arakaki" },
			// { value: "hello world is very short!", result: "hello world is very short!" },
			// { value: "titulo de um artigo.", result: "titulo de um artigo." },
			// { value: "Piece of cake!!!", result: "Piece of cake!!!" },
		]

		arrayOfValidNames.map(({ value, result }) => {
			const description = createShortDescription(value, "Short Description")
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