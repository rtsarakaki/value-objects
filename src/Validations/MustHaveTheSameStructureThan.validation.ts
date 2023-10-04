import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface MustHaveOnlyOneWordInterface extends GenericValidation {
	(value: string, label: string, required?: boolean, language?: string): any;
}

export function MustHaveTheSameStructureThan<T>(value: string, label: string, required: boolean = true, language: string = 'en-US'): null | InvalidValue {

	function validate(value: string, errorMessage: string) {
		try {
			const resultado = JSON.parse(value);
			const model: T = resultado;

			return null;
		} catch (e) {
			return new InvalidValue(errorMessage);
		}
	}

	const replaceList = [
		{ tag: '${label}', value: label },
		{ tag: "${JSON.stringify('model')}", value: JSON.stringify('model') },
	];
	return validationAcceleratorSuggestion(validate, value, label, required, "MustHaveTheSameStructureThan", language, replaceList)
}