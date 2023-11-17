import { describe, expect, test } from '@jest/globals';
import { Acronym, createAcronymCode } from './Acronym.type';

describe(`Valid Acronym Values.`, () => {
	const arrayOfValidValues = [
		{ value: 'sp', expected: 'SP' },
		{ value: 'colab', expected: 'COLAB' },
		{ value: '--', expected: '--' },
		{ value: '53', expected: '53' },
	]
	describe.each(arrayOfValidValues)(`%p.`, ({ value, expected }) => {
		const acronym = new Acronym(value, 'my label', true, true)
		test(`Expected ${expected} and received ${acronym.value}}`, () => {
			expect(acronym.value).toEqual(expected)
		})
		test(`Expected 0 errors and received ${acronym.errors}`, () => {
			expect(acronym.errors.length).toEqual(0)
		})

	});

});

describe('Test a list of invalid names', () => {
	const arrayOfInvalidValues = [
		{ value: '-ricardo', label: 'ricardo' },
		{ value: 'invalid.kebab.value', label: 'with dots' },
	]

	describe.each(arrayOfInvalidValues)('"$name" is invalid.', ({ value, label }) => {
		const acronym = createAcronymCode(value, label);
		test(`${acronym.errors.length} errors found, so the "${value}" is an invalid name.`, () => {
			expect(acronym.errors.length).toBeGreaterThan(0)
		});
		test(`${acronym.errors}`, () => {
			expect(acronym.errors.length).toBeGreaterThan(0)
		});
	});
});

test('Invalid Acronym Values', () => {
	const arrayOfInvalidNames = [
		{ word: '' },
		{ word: 'a b' },
		{ word: 'two words' },
		{ word: null },
		{ word: undefined },
		{ word: 1000 },
	]

	arrayOfInvalidNames.map(({ word }) => {
		const fullName = createAcronymCode(word as string, "KebabCode")
		expect(fullName.errors.length).toBeGreaterThan(0)
	})
})

test('Create Acronym without pass the label', () => {
	const fullName = createAcronymCode('Test')
	expect(fullName.errors.length).toEqual(0)
})
