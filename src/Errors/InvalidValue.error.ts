import { GenericError } from './GenericError.error';

export class InvalidValue extends GenericError {
	constructor(message: string, errors: any = null) {
		super(message, errors);
		Object.setPrototypeOf(this, InvalidValue.prototype);
	}
}