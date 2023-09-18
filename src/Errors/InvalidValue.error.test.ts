import { describe, expect, test } from '@jest/globals';
import GenericError from './GenericError.error';
import InvalidValue from './InvalidValue.error';

describe('InvalidValue', () => {

	test('InvalidValue must be instance of GenericError', () => {
		const message = ''
		const errors = null
		const validation = new InvalidValue(message, errors)
		expect(validation).toBeInstanceOf(GenericError)
	})

	test('InvalidValue construtor must set message and errors properties', () => {
		const message = 'any message'
		const errors = null
		const invalidValue = new InvalidValue(message, errors)
		expect(invalidValue.message).toEqual(message)
		expect(invalidValue.errors).toBeNull()
	})

})