import { describe, expect, test } from '@jest/globals';
import { getLanguage, getResourceMessageByKey } from './Messages.resource';

describe('Resource', () => {

	test('Get default language.', () => {
		const result = getLanguage()
		expect(result).toBe('en-US');
	})

	test('Find message by key from default language', () => {
		const message = getResourceMessageByKey('CannotBeBlank');
		expect(message).toBe('${label} cannot be blank.');
	})

	test('Find message by key and language', () => {
		const message = getResourceMessageByKey('CannotBeBlank', 'en-US');
		expect(message).toBe('${label} cannot be blank.');
	})

	test('When requested key dont exist', () => {
		const key = 'x'
		const language = 'en-US'
		const getMessage = () => getResourceMessageByKey(key, language);
		expect(getMessage).toThrowError(`Message not found for key: ${key} and language: ${language}`)
	})

	test('When requested language dont exist', () => {
		const key = 'CannotBeBlank'
		const language = 'y'
		const getMessage = () => getResourceMessageByKey(key, language);
		expect(getMessage).toThrowError(`Message not found for key: ${key} and language: ${language}`)
	})

	test('All validators has his message', () => {
		const values = [
			{ key: "CannotBeBlank" },
			{ key: "CannotHaveMoreThanXCharacters" },
			{ key: "CannotHaveSpecialCharacters" },
			{ key: "CannotStartWithZero" },
			{ key: "IsValidColor" },
			{ key: "IsValidEmail" },
			{ key: "IsValidUrl" },
			{ key: "MustBeContainedInEnum" },
			{ key: "MustContainOnlyNumbers" },
			{ key: "MustHaveAtLeastXCharacters" },
			{ key: "MustHaveOnlyOneWord" },
			{ key: "MustHaveTheSameStructureThan" },
			{ key: "validateLabel" },
		]

		values.map((value) => {
			const getMessage = () => getResourceMessageByKey(value.key);
			expect(getMessage()).toBeDefined()
		})
	})

})