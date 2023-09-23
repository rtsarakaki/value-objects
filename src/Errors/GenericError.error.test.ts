import { describe, expect, test } from '@jest/globals';
import GenericError from './GenericError.error';

test('When passed message = null and error = null to constructor.', () => {
	const message = null
	const errors = null
	const validation = new GenericError((message as unknown) as string, errors)
	expect(validation).toBeInstanceOf(Error)
})

test('When passed message = "" and error = null to constructor.', () => {
	const message = ''
	const errors = null
	const validation = new GenericError((message as unknown) as string, errors)
	expect(validation).toBeInstanceOf(Error)
})

const message = 'valid error message'
describe(`When passed message = "${message}" and errors = null to construtor.`, () => {
	const errors = null
	const genericError = new GenericError(message, errors)
	test(`Generic error object was created with message "${message}"`, () => {
		expect(genericError.message).toEqual(message)
	});

	test(`Errors collection is null.`, () => {
		expect(genericError.errors).toBeNull()
	});

})

describe(`When passed message = "${message}" and errors wasn\'t passed as null to construtor.`, () => {
	const genericError = new GenericError(message)
	test(`Generic error object was created with message "${message}"`, () => {
		expect(genericError.message).toEqual(message)
	});
	test(`Errors collection is null.`, () => {
		expect(genericError.errors).toBeNull()
	});
})
