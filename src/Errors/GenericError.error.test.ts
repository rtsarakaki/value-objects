import { describe, expect, test } from '@jest/globals';
import GenericError from './GenericError.error';

describe('GenericError', () => {

	test('GenericError must be instance of Error', () => {
		const message = ''
		const errors = null
		const validation = new GenericError(message, errors)
		expect(validation).toBeInstanceOf(Error)
	})

	test('GenericError construtor must set message and errors properties', () => {
		const message = 'any message'
		const errors = null
		const genericError = new GenericError(message, errors)
		expect(genericError.message).toEqual(message)
		expect(genericError.errors).toBeNull()
	})

	test('GenericError construtor must set message, but errors is optional', () => {
		const message = 'any message'
		const genericError = new GenericError(message)
		expect(genericError.message).toEqual(message)
		expect(genericError.errors).toBeNull()
	})

})