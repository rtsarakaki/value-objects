import { describe, expect, test } from '@jest/globals';
import GenericError from './GenericError.error';
import InvalidValue from './InvalidValue.error';

test('InvalidValue must be instance of GenericError', () => {

	const message = ''
	const errors = null
	const validation = new InvalidValue(message, errors)
	expect(validation).toBeInstanceOf(GenericError)
})

describe('InvalidValue construtor must set message and errors = null', () => {
	const message = 'any message'
	const errors = null
	const invalidValue = new InvalidValue(message, errors)

	test(`New InvalidValue message is ${invalidValue.message}`, () => {
		expect(invalidValue.message).toEqual(message)
	});

	test('New InvalidValue has no errors', () => {
		expect(invalidValue.errors).toBeNull()
	});
})

describe('InvalidValue construtor must set message and error list.', () => {
	const message = 'any message'
	const errors = [new InvalidValue('error 1'), new InvalidValue('error 2')]
	const invalidValue = new InvalidValue(message, errors)

	test(`New InvalidValue message is ${invalidValue.message}`, () => {
		expect(invalidValue.message).toEqual(message)
	});

	describe('Error list check', () => {
		test.each(errors)('New InvalidValue has "%p".', (error) => {
			expect(error).toBeInstanceOf(InvalidValue)
		});
	});
})
