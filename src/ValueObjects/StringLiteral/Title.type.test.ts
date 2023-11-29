import { describe, expect, test } from '@jest/globals';
import { createTitle } from './Title.type';


describe('Title value object', () => {
	test('Valid Title Values.', () => {
		const arrayOfValidNames = [
			{ value: 'Ricardo', result: 'Ricardo' },
			{ value: "That's my title", result: "That's My Title" },
			{ value: "Welcome back, Ricardo Tadeu Sinhei Arakaki", result: "Welcome Back, Ricardo Tadeu Sinhei Arakaki" },
			{ value: "hello world!", result: "Hello World!" },
			{ value: "       hello world!", result: "Hello World!" },
			{ value: "       hello world!         ", result: "Hello World!" },
			{ value: "titulo de um artigo.", result: "Titulo de Um Artigo." },
			{ value: "Piece of cake!!!", result: "Piece of Cake!!!" },
		]

		arrayOfValidNames.map(({ value, result }) => {
			const title = createTitle(value, "Title")
			expect(title.value).toBe(result)
			expect(title.errors.length).toBe(0)
		})
	})

	test('Invalid Title Values', () => {
		const arrayOfInvalidNames = [
			{ name: '', result: 3 },
			{ name: 'a', result: 2 },
		]

		arrayOfInvalidNames.map(({ name, result }) => {
			const fullName = createTitle(name, "Title")
			expect(fullName.errors.length).toBe(result)
		})
	})
})