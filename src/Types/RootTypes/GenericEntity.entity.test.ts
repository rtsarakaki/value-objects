import { describe, expect, test } from '@jest/globals';
import InvalidValue from '../../Errors/InvalidValue.error';
import GenericEntity from './GenericEntity.entity';
import GenericType from './GenericType.type';

export const TypeValidator = (value: string) => {

	if (value !== 'GenericType Test') {
		return new InvalidValue('test not ok')
	}

	if (value === 'GenericType Test') {
		return null
	}
};

class TestType extends GenericType {
	constructor(value: string) {
		super(value);
		if (value !== undefined) {
			this.validate([
				() => TypeValidator(value),
			]);
			this.value = value;
		}
	}
}

class TestEntity extends GenericEntity {

	_prop1: TestType;
	_prop2: TestType;

	constructor(propOk: string, propNOk: string) {
		super();
		this._prop1 = this.initProp(this, new TestType(propOk));
		this._prop2 = this.initProp(this, new TestType(propNOk));
	}

	get prop1() {
		return this._prop1.value;
	}

	get prop2() {
		return this._prop2.value;
	}
}

describe('GenericType', () => {

	test('GenericType structure ok', () => {
		expect(1).toEqual(1);
	});

	test('GenericEntity structure ok', () => {
		const valueOk = "GenericType Test"
		const valueNOk = "this is valid value"
		const genericEntity = new TestEntity(valueOk, valueNOk)
		// Must be a GenericType
		expect(genericEntity).toBeInstanceOf(GenericEntity)
		// Must have a property value
		expect(genericEntity.id).toEqual('')
	})

	test('GenericEntity with 1 property ok and 1 propoerty with error', () => {
		const valueOk = "GenericType Test"
		const valueNOk = "this is valid value"
		const genericEntity = new TestEntity(valueOk, valueNOk)

		expect(genericEntity.isValid).toBeFalsy()
		expect(genericEntity.errors.length).toEqual(1)
		expect(genericEntity.prop1).toEqual(valueOk)
		expect(genericEntity.prop2).toEqual(valueNOk)
	})

	test('GenericEntity with 2 properties Ok', () => {
		const valueOk = "GenericType Test"
		const valueNOk = "this is valid value"
		const genericEntity = new TestEntity(valueOk, valueOk)

		expect(genericEntity.isValid).toBeTruthy()
		expect(genericEntity.errors.length).toEqual(0)
		expect(genericEntity.prop1).toEqual(valueOk)
		expect(genericEntity.prop2).toEqual(valueOk)
	})

	test('GenericEntity with 2 properties NOk', () => {
		const valueOk = "GenericType Test"
		const valueNOk = "this is valid value"
		const genericEntity = new TestEntity(valueNOk, valueNOk)

		expect(genericEntity.isValid).toBeFalsy()
		expect(genericEntity.errors.length).toEqual(2)
		expect(genericEntity.prop1).toEqual(valueNOk)
		expect(genericEntity.prop2).toEqual(valueNOk)
	})

}) 