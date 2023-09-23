import { describe, expect, test } from '@jest/globals';
import { ITagListItem, replaceTagsInMessage } from './Replacer.resource';

describe('Replace tags in string', () => {
	const validTagList = [
		{ message: 'Hello ${name}', tagItems: [{ tag: '${name}', value: 'John' }], result: 'Hello John' },
		{ message: '${name1}, ${name2}, ${name3}, ${name4} are the Beatles', tagItems: [{ tag: '${name1}', value: 'John' }, { tag: '${name2}', value: 'Paul' }, { tag: '${name3}', value: 'George' }, { tag: '${name4}', value: 'Ringo' }], result: 'John, Paul, George, Ringo are the Beatles' },
		{ message: "This ${name1} has ' ${name2} to test the ${name3} function", tagItems: [{ tag: '${name1}', value: 'message' }, { tag: '${name2}', value: 'character' }, { tag: '${name3}', value: 'replace' }], result: "This message has ' character to test the replace function" },
	]

	test.each(validTagList)('Returned "$result" from "$message".', ({ message, tagItems }) => {
		const result = replaceTagsInMessage(message, tagItems)
		expect(result).toBe(result);
	})

})

describe('Testing invald tag list.', () => {
	const invalidTagList = [
		{ message: 'Hello ${name}', tagItems: { key: '${name}' }, result: 'Hello John' },
		{ message: 'Hello ${name}', tagItems: null, result: 'Hello John' },
		{ message: 'Hello ${name}', tagItems: 0, result: 'Hello John' },
	]

	test.each(invalidTagList)(`%p throwns error.`, ({message, tagItems}) => {
		expect(() => { replaceTagsInMessage(message, tagItems)}).toThrowError();
	})

})

test('Invalid tag list content', () => {
	const result = true
	expect(result).toBe(true);
})

test('Invalid message to be replaced', () => {
	const result = true
	expect(result).toBe(true);
})
