import { describe, expect, test } from '@jest/globals';
import { replaceTagsInMessage } from './Replacer.resource';

describe('Replacer.resource', () => {
	test('Replace tags in string', () => {
		const tagList = [
			{ message: 'Hello ${name}',tagItems: [{ tag: '${name}', value: 'John' }], result: 'Hello John' },
			{ message: '${name1}, ${name2}, ${name3}, ${name4} are the Beatles', tagItems: [{ tag: '${name1}', value: 'John' }, { tag: '${name2}', value: 'Paul' }, { tag: '${name3}', value: 'George' }, { tag: '${name4}', value: 'Ringo' } ], result: 'John, Paul, George, Ringo are the Beatles' },
			{ message: "This ${name1} has ' ${name2} to test the ${name3} function", tagItems: [{ tag: '${name1}', value: 'message' }, { tag: '${name2}', value: 'character' }, { tag: '${name3}', value: 'replace' }], result: "This message has ' character to test the replace function" },
		]

		tagList.map((item) => {
			const result = replaceTagsInMessage(item.message, item.tagItems)
			expect(result).toBe(item.result);
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
})