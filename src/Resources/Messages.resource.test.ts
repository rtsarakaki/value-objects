import { describe, expect, test } from '@jest/globals';
import { getLanguage, getResourceMessageByKey } from './Messages.resource';

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

describe('All validators has his message configured in Messages.resouces.json', () => {
	const arrayOfValidationNames = [
		{ key: "CannotBeBlank" },
		{ key: "CannotHaveMoreThanXCharacters" },
		{ key: "CannotContainSpecialCharacters" },
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
		{ key: "CannotContainNumbers" },
		{ key: "replaceTagsInMessage" },
	]

	test.each(arrayOfValidationNames)('$key message configured.', ({key}) => {
		const getMessage = () => getResourceMessageByKey(key);
		expect(getMessage()).toBeDefined()
	})
})
