import { CannotBeBlank, CannotContainNumbers, ValidateEntity } from "../Decorators";
import { GenericError } from "../Errors";
import { GenericEntity } from "../Types";
import { KebabCode } from "../ValueObjects";

@ValidateEntity
class Frankenstein extends GenericEntity {

	@CannotBeBlank('Required Property', true)
	_requiredProperty: string;

	@CannotContainNumbers('No Numbers')
	_noNumbers: string;

	errors: GenericError[];

	_kebabCode: KebabCode;

	constructor(valores: any) {
		super();
		this._requiredProperty = valores.requiredProperty
		this._noNumbers = valores.noNumbers
		this._kebabCode = new KebabCode(valores.kebabCode, 'No Numbers', true);
		this.errors = [];
	}

	get requiredProperty() {
		return this._requiredProperty;
	}

	get noNumbers() {
		return this._noNumbers;
	}
	
	get kebabCode() {
		return this._kebabCode.value;
	}
}

const valores = {
	requiredProperty: 'ok',
	noNumbers: 'Do not allow numbers',
	kebabCode: 'kebab-code'
}
try {
	const frank = new Frankenstein(valores);
	console.log(' --- RESULTADO --- ', frank.isValid, frank.errors.length, JSON.stringify(frank), frank.requiredProperty, frank.noNumbers, frank.kebabCode)
	frank.errors.forEach((error: GenericError) => {
		console.log('InvalidValue: ', error.message)
	})
}
catch (err: any) {
	console.log('catch: ', err.message)
}
