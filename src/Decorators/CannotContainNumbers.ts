import { ValidationDecorator } from "./ValidationDecorator";
import { CannotContainNumbers as CannotContainNumbersValidator } from "../Validations/CannotContainNumbers.validation";

export const CannotContainNumbers = (label: string, language: string = 'en-US') => {
	return function (target: any, key: string) {
		ValidationDecorator(label, true,
			(value: string, label: string) => {
				const result = CannotContainNumbersValidator(value, label, language);
				return result;
			}
		)(target, key);
	};
};
