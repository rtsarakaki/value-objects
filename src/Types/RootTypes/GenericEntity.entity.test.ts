import { describe, expect, test } from '@jest/globals';
import { InvalidValue } from '../../Errors/InvalidValue.error';
import { GenericEntity } from './GenericEntity.entity';
import { GenericType } from './GenericType.type';

export const TypeValidator = (value: string) => {

	if (value !== 'GenericType Test') {
		return new InvalidValue('test not ok')
	}
	return null
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

type TestModel = {
	id?: string
	prop1: string;
	prop2: string;
}

type TestModelDto = {
	id?: string
	props: string []
}

class TestEntity extends GenericEntity<TestModel> {

	_prop1: TestType;
	_prop2: TestType;

	constructor(model: TestModel) {
		super(model);
		this._prop1 = this.initProp(this, new TestType(model.prop1));
		this._prop2 = this.initProp(this, new TestType(model.prop2));
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
		const model: TestModel = {
			prop1: "GenericType Test",
			prop2: "this is valid value"
		}
		const genericEntity = new TestEntity(model)
		// Must be a GenericType
		expect(genericEntity).toBeInstanceOf(GenericEntity)
		// Must have a property value
		expect(genericEntity.id).toEqual(undefined)
	})

	test('GenericEntity with 1 property ok and 1 propoerty with error', () => {
		const model: TestModel = {
			prop1: "GenericType Test",
			prop2: "this is valid value"
		}
		const genericEntity = new TestEntity(model)

		expect(genericEntity.isValid).toBeFalsy()
		expect(genericEntity.errors.length).toEqual(1)
		expect(genericEntity.prop1).toEqual(model.prop1)
		expect(genericEntity.prop2).toEqual(model.prop2)
	})

	test('GenericEntity with 2 properties Ok', () => {
		const model: TestModel = {
			prop1: "GenericType Test",
			prop2: "GenericType Test"
		}
		const genericEntity = new TestEntity(model)

		expect(genericEntity.isValid).toBeTruthy()
		expect(genericEntity.errors.length).toEqual(0)
		expect(genericEntity.prop1).toEqual(model.prop1)
		expect(genericEntity.prop2).toEqual(model.prop2)
	})

	test('GenericEntity with 2 properties NOk', () => {
		const model: TestModel = {
			prop1: "this is valid value",
			prop2: "this is valid value"
		}
		const genericEntity = new TestEntity(model)

		expect(genericEntity.isValid).toBeFalsy()
		expect(genericEntity.errors.length).toEqual(2)
		expect(genericEntity.prop1).toEqual(model.prop1)
		expect(genericEntity.prop2).toEqual(model.prop2)
	})
}) 