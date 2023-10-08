import { CollectionThatDoesNotAllowDuplicates } from "../ValueObjects";

type Phone = {
	value: string;
	description: string;
	type: 'phone' | 'email';
};

const array: Phone[] = [
	{ value: '123456789', description: 'Home phone', type: 'phone' },
	{ value: '987654321', description: 'Work phone', type: 'phone' },
	{ value: 'john.doe@example.com', description: 'Personal email', type: 'email' }
];

const collection = new CollectionThatDoesNotAllowDuplicates(array, 'value', 'Contacts');
console.log(`items=${collection.items.length} errors=${collection.errors.length} isValid=${collection.isValid}`)
console.log(collection.items)
console.log(collection.keys)
console.log(collection.errors)
console.log('---------------------------------------------------------------------------------------')

// test('Should add an item to the collection', () => {
console.log('Should add an item to the collection', { value: '555555555', description: 'Mobile phone', type: 'phone' })
collection.add({ value: '555555555', description: 'Mobile phone', type: 'phone' });
console.log(`items=${collection.items.length} errors=${collection.errors.length} isValid=${collection.isValid}`)
console.log(collection.items)
console.log(collection.keys)
console.log(collection.errors)
console.log('---------------------------------------------------------------------------------------')
// expect(collection.items).toContainEqual({ value: '555555555', description: 'Mobile phone', type: 'phone' });
// expect(collection.errors.length).toBe(0);
// expect(collection.isValid).toBeTruthy();
// });

// test('Should add an item with a duplicated key to the collection but generates an error.', () => {
console.log('Should add an item with a duplicated key to the collection but generates an error', { value: '123456789', description: 'Home phone', type: 'phone' })
collection.add({ value: '123456789', description: 'Home phone', type: 'phone' });
console.log(`items=${collection.items.length} errors=${collection.errors.length} isValid=${collection.isValid}`)
console.log(collection.items)
console.log(collection.keys)
console.log(collection.errors)
console.log('---------------------------------------------------------------------------------------')
// 	expect(collection.items).toContainEqual({ value: '123456789', description: 'Home phone', type: 'phone' });
// 	expect(collection.errors.length).toBeGreaterThan(0);
// 	expect(collection.isValid).toBeFalsy();
// });

// test('Should update an item in the collection', () => {
console.log('Should update an item in the collection', '987654321', { value: '123456789', description: 'New home phone', type: 'phone' })
collection.update('987654321', { value: '123456789', description: 'New home phone', type: 'phone' });
console.log(`items=${collection.items.length} errors=${collection.errors.length} isValid=${collection.isValid}`)
console.log(collection.items)
console.log(collection.keys)
console.log(collection.errors)
console.log('---------------------------------------------------------------------------------------')
// 	expect(collection.items).toContainEqual({ value: '123456789', description: 'New home phone', type: 'phone' });
// 	expect(collection.errors.length).toBe(0);
// 	expect(collection.isValid).toBeTruthy();
// });

// test('Should not update an item with a non-existent key in the collection', () => {
console.log('Should not update an item with a non-existent key in the collection', '555', { value: 'nonexistent@example.com', description: 'Non-existent item', type: 'email' })
// collection.update('555', { value: 'nonexistent@example.com', description: 'Non-existent item', type: 'email' });
console.log(`items=${collection.items.length} errors=${collection.errors.length} isValid=${collection.isValid}`)
console.log(collection.items)
console.log(collection.keys)
console.log(collection.errors)
console.log('---------------------------------------------------------------------------------------')
// 	expect(collection.items).not.toContainEqual({ value: 'nonexistent@example.com', description: 'Non-existent item', type: 'email' });
// 	expect(collection.errors.length).toBe(0);
// 	expect(collection.isValid).toBeTruthy();
// });

// test('Should remove an item from the collection', () => {
console.log('Should remove an item from the collection', { value: '123456789', description: 'New home phone', type: 'phone' })
collection.remove({ value: '123456789', description: 'New home phone', type: 'phone' });
console.log(`items=${collection.items.length} errors=${collection.errors.length} isValid=${collection.isValid}`)
console.log(collection.items)
console.log(collection.keys)
console.log(collection.errors)
console.log('---------------------------------------------------------------------------------------')
// 	expect(collection.items).not.toContainEqual({ value: '123456789', description: 'New home phone', type: 'phone' });
// 	expect(collection.errors.length).toBe(0);
// 	expect(collection.isValid).toBeTruthy();
// });

// test('Should not remove an item with a non-existent key from the collection', () => {
console.log('Should not remove an item with a non-existent key from the collection', { value: 'nonexistent@example.com', description: 'Non-existent item', type: 'email' })
collection.remove({ value: 'nonexistent@example.com', description: 'Non-existent item', type: 'email' });
console.log(`items=${collection.items.length} errors=${collection.errors.length} isValid=${collection.isValid}`)
console.log(collection.items)
console.log(collection.keys)
console.log(collection.errors)
console.log('---------------------------------------------------------------------------------------')
// 	expect(collection.items).not.toContainEqual({ value: '987654321', description: 'Work phone', type: 'phone' });
// 	expect(collection.errors.length).toBe(0);
// 	expect(collection.isValid).toBeTruthy();
// });
