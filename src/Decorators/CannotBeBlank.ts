import { ValidationDecorator } from "./ValidationDecorator";
import { CannotBeBlank as CannotBeBlankValidator } from "../Validations/CannotBeBlank.validation";


export const CannotBeBlank = (label: string, required: boolean, language: string = 'en-US') => {
	return function (target: any, key: string) {
		ValidationDecorator(label, required,
			(value: string, label: string) => {
				const result = CannotBeBlankValidator(value, label, required, language);
				return result;
			}
		)(target, key);
	};
};
