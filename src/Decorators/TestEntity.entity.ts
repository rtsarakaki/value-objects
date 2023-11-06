import { ValidateEntity } from './ValidateEntity';
import { InvalidValue } from '../Errors/InvalidValue.error';
import { GenericEntity } from '../Types/RootTypes/GenericEntity.entity';
import { GenericType } from '../Types/RootTypes/GenericType.type';

@ValidateEntity
export class TestEntity extends GenericEntity<TestModel> {

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

export const TypeValidator = (value: string) => {

	if (value !== 'GenericType Test') {
		return new InvalidValue('test not ok')
	}
	return null
};

export class TestType extends GenericType {
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

export type TestModel = {
	id?: string
	prop1: string;
	prop2: string;
}

export type TestModelDto = {
	id?: string
	props: string[]
}

