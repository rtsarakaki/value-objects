import { describe, expect, test } from '@jest/globals';
import { CollectionThatDoesNotAllowDuplicates } from './CollectionThatDoesNotAllowDuplicates.type';

describe('Testing CollectionThatDoesNotAllowDuplicates', () => {
	const collection = new CollectionThatDoesNotAllowDuplicates<string>('Names');

	test('Should add an item to the collection', () => {
		collection.add('Ricardo', '1');
		expect(collection.items).toContain('Ricardo');
	});

	test('Should add an item with a different key to the collection', () => {
		collection.add('Tadeu', '2');
		expect(collection.items).toContain('Tadeu');
		expect(collection.errors.length).toBe(0);
	});

	test('Should not add an item with a duplicated key to the collection', () => {
		collection.add('Arakaki', '1');
		expect(collection.items).not.toContain('Arakaki');
		expect(collection.errors.length).toBeGreaterThan(0);
		expect(collection.isValid).toBeFalsy()
	});

});