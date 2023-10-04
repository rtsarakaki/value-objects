import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types/RootTypes/GenericValidation.validation";


export interface ValidationDecoratorInterface {
	(label: string, required: boolean, validation: GenericValidation): (target: any, key: string) => void;
}

export const ValidationDecorator: ValidationDecoratorInterface = (label: string, required: boolean, validation: GenericValidation) => {
	return function (target: any, key: string) {
		let value = target[key];

		const addError = (error: Error) => {
			value = error;
			let errors = target['errors'];
			if (!errors) {
				errors = [];
			}
			errors.push(error);
		};

		Object.defineProperty(target, key, {
			get: function () {
				return value;
			},
			set: function (newValue: string) {
				const typeValidation = typeof newValue !== 'string';
				if (typeValidation) { throw new InvalidValue(`The value of '${label}' must be a string. ${typeof newValue} stringfy ${JSON.stringify(newValue)}`); }

				const emptyOrNotDefined = required && (newValue == undefined || newValue.length === 0 || newValue?.trim() === '');
				if (emptyOrNotDefined) { throw new InvalidValue(`The value of '${label}' cannot be blank.`); }

				const validationError = validation(newValue, label);
				if (validationError) { throw validationError; }

				value = newValue;
			},
			enumerable: true,
			configurable: true
		});
	};
};
