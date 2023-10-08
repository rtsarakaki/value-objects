import { describe, expect, test } from '@jest/globals';
import { CollectionThatDoesNotAllowDuplicates } from './CollectionThatDoesNotAllowDuplicates.type';
import { InvalidValue } from '../../Errors';

describe('Testing CollectionThatDoesNotAllowDuplicates', () => {
	const array = [
		{ value: '123456789', description: 'Home phone', type: 'phone' },
		{ value: '987654321', description: 'Work phone', type: 'phone' },
		{ value: 'john.doe@example.com', description: 'Personal email', type: 'email' }
	];
	const collection = new CollectionThatDoesNotAllowDuplicates(array, 'value', 'Contacts');

	test('Should add an item to the collection', () => {
		collection.add({ value: '555555555', description: 'Mobile phone', type: 'phone' });
		expect(collection.items).toContainEqual({ value: '555555555', description: 'Mobile phone', type: 'phone' });
		expect(collection.errors.length).toBe(0);
		expect(collection.isValid).toBeTruthy();
	});

	test('Should add an item with a duplicated key to the collection but generates an error.', () => {
		collection.add({ value: '123456789', description: 'Home phone', type: 'phone' });
		expect(collection.items).toContainEqual({ value: '123456789', description: 'Home phone', type: 'phone' });
		expect(collection.errors.length).toBeGreaterThan(0);
		expect(collection.errors[0]).toBeInstanceOf(InvalidValue);
		expect(collection.isValid).toBeFalsy();
	});

	test('Should update an item in the collection', () => {
		collection.update('987654321', { value: '123456789', description: 'New home phone', type: 'phone' });
		expect(collection.items).toContainEqual({ value: '123456789', description: 'New home phone', type: 'phone' });
		expect(collection.errors.length).toBe(1);
		expect(collection.isValid).toBeFalsy();
	});

	test('Should not update an item with a non-existent key in the collection', () => {
		expect(() => {
			collection.update('555', { value: 'nonexistent@example.com', description: 'Non-existent item', type: 'email' });
		}).toThrowError('Key not found');
	});

	test('Should remove an item from the collection', () => {
		collection.remove({ value: '123456789', description: 'New Home phone', type: 'phone' });
		expect(collection.items).not.toContainEqual({ value: '123456789', description: 'New home phone', type: 'phone' });
		expect(collection.errors.length).toBe(0);
		expect(collection.isValid).toBeTruthy();
	});

	test('Should not remove an item with a non-existent key from the collection', () => {
		expect(() => {
			collection.remove({ value: 'nonexistent@example.com', description: 'Non-existent item', type: 'email' });
		}).toThrowError('Item not found');
	});

	test('Should throw an error if the key property does not exist in the object', () => {
		expect(() => {
			new CollectionThatDoesNotAllowDuplicates(array, 'invalidKey', 'Contacts');
		}).toThrowError('The invalidKey property does not exist in the object');
	});
});