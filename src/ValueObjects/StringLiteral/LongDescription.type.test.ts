import { describe, expect, test } from '@jest/globals';
import { createLongDescription } from './LongDescription.type';

test.todo('convert test to test.each model');

describe('LongDescription value object', () => {
	test('Valid LongDescription Values.', () => {
		const arrayOfValidNames = [
			{ value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
			incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
			ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
			sunt in culpa qui officia deserunt mollit anim id est laborum.
			At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum 
			deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, 
			similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem 
			rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil 
			impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor 
			repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et 
			voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, 
			ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.` },
		]

		arrayOfValidNames.map(({ value }) => {
			const description = createLongDescription(value, "Long Description")
			expect(description.errors.length).toBe(0)
		})
	})

	test('Invalid LongDescription Values', () => {
		const arrayOfInvalidNames = [
			{ value: '' },
			{ value: '          ' },
			{ value: 'a' },
			{ value: ' a ' },
			{ value: null },
			{ value: undefined },
			{ value: 1000 },
		]

		arrayOfInvalidNames.map(({ value }) => {
			const description = createLongDescription(value as string, "Long Description")
			expect(description.errors.length).toBeGreaterThan(0)
		})
	})
})