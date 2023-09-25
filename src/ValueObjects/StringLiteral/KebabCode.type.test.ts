import { describe, expect, test } from '@jest/globals';
import { KebabCode, createKebabCode } from './KebabCode.type';

describe(`Valid KebabCode Values.`, () => {
	const arrayOfValidValues = [
		{ value: 'ricardo', expected: 'ricardo' },
		{ value: 'kebab-case', expected: 'kebab-case' },
		{ value: 'KEBAB-CASE', expected: 'kebab-case' },
		{ value: '  KEBAB-CASE  ', expected: 'kebab-case' },
		{ value: '  Kebab-Case  ', expected: 'kebab-case' },
		{ value: '  Kebab-Case123  ', expected: 'kebab-case123' },
		{ value: '  9999-9999  ', expected: '9999-9999' },
		{ value: '  ABC-9999  ', expected: 'abc-9999' },
	]
	describe.each(arrayOfValidValues)(`%p.`, ({ value, expected }) => {
		const kebabCode = new KebabCode(value, 'my label')
		test(`Expected ${expected} and received ${kebabCode.value}}`, () => {
			expect(kebabCode.value).toEqual(expected)
		})
		test(`Expected 0 errors and received ${kebabCode.errors}`, () => {
			expect(kebabCode.errors.length).toEqual(0)
		})

	});

});

describe('Test a list of invalid names', () => {
	const arrayOfInvalidValues = [
		{ value: '-ricardo', label: 'ricardo' },
		{ value: 'invalid.kebab.value', label: 'with dots' },
		{ value: 'snake_case', label: 'snake' },
		{ value: '123_case', label: 'snake' },
		{ value: '123--case', label: 'snake' },
		{ value: 'case--', label: 'snake' },
		{ value: 'case-', label: 'end with dash' },
	]

	describe.each(arrayOfInvalidValues)('"$name" is invalid.', ({ value, label }) => {
		const kebabCode = createKebabCode(value, label);
		test(`${kebabCode.errors.length} errors found, so the "${value}" is an invalid name.`, () => {
			expect(kebabCode.errors.length).toBeGreaterThan(0)
		});
		test(`${kebabCode.errors}`, () => {
			expect(kebabCode.errors.length).toBeGreaterThan(0)
		});
	});
});

test('Invalid KebabCode Values', () => {
	const arrayOfInvalidNames = [
		{ word: '' },
		{ word: 'a b' },
		{ word: 'two words' },
		{ word: null },
		{ word: undefined },
		{ word: 1000 },
	]

	arrayOfInvalidNames.map(({ word }) => {
		const fullName = createKebabCode(word as string, "KebabCode")
		expect(fullName.errors.length).toBeGreaterThan(0)
	})
})

test('Create KebabCode withou pass the label', () => {
	const fullName = createKebabCode('Test')
	expect(fullName.errors.length).toEqual(0)
})
