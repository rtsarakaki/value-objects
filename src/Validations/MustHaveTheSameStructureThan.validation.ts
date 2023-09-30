import { InvalidValue } from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface MustHaveOnlyOneWordInterface extends GenericValidation {
	(value: string, label: string, language?: string): any;
}

export function MustHaveTheSameStructureThan<T>(value: string, label: string, language: string = 'en-US'): null | InvalidValue {

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
	return validationAcceleratorSuggestion(validate, value, label, "MustHaveTheSameStructureThan", language, replaceList)
}