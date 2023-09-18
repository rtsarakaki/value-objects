import { describe, expect, test } from '@jest/globals';
import InvalidValue from '../../Errors/InvalidValue.error';
import GenericType from './GenericType.type';

class TestType extends GenericType {
	constructor() {
		super('initial value');
	}
}

export const TestOkValidator = (
) => {
	return null
};

export const TestNOkValidator = (
) => {
	return new InvalidValue('test not ok')
};

describe('GenericType', () => {

	test('GenericType structure ok', () => {
		const genericType = new TestType()
		// Must be a GenericType
		expect(genericType).toBeInstanceOf(GenericType)
		// Must have a property value
		expect(genericType.value).toEqual('initial value')
		// Must have a property isValid
		expect(genericType.isValid).toBeTruthy()
		// Must have a property an error array with no items
		expect(genericType.errors.length).toEqual(0)
	})

	test('GenericType with 1 validation and no error', () => {
		const genericType = new TestType()
		expect(genericType).toBeInstanceOf(GenericType)
		genericType.validate([TestOkValidator])
		expect(genericType.isValid).toBeTruthy()
		expect(genericType.errors.length).toEqual(0)
	})

	test('GenericType with 2 validations and 1 error', () => {
		const genericType = new TestType()
		genericType.validate([TestNOkValidator, TestOkValidator])
		expect(genericType.isValid).toBeFalsy()
		expect(genericType.errors.length).toEqual(1)
		expect(genericType.errors[0].message).toEqual('test not ok')
	})

	test('GenericType with 3 validations and 2 errors', () => {
		const genericType = new TestType()
		genericType.validate([TestNOkValidator, TestNOkValidator, TestOkValidator])
		expect(genericType.isValid).toBeFalsy()
		expect(genericType.errors.length).toEqual(2)
		expect(genericType.errors[0].message).toEqual('test not ok')
		expect(genericType.errors[1].message).toEqual('test not ok')
	})

}) 