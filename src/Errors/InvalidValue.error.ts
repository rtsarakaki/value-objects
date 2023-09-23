import { GenericError } from './GenericError.error';

export class InvalidValue extends GenericError {
	constructor(message: string, erros: any = null) {
		super(message, erros);
		Object.setPrototypeOf(this, InvalidValue.prototype);
	}
}