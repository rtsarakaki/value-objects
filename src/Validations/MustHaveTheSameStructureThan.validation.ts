import { InvalidValue } from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";

interface MustHaveOnlyOneWordInterface extends GenericValidation {
	(value: string, label: string, language?: string): any;
}

export function MustHaveTheSameStructureThan<T>(value: string, label: string, language: string = 'en-US'): T | InvalidValue {
	const replaceList = [
		{ tag: '${label}', value: label },
		{ tag: "${JSON.stringify('model')}", value: JSON.stringify('model') },
	];
	const errorMessage = getResourceMessageByKey(MustHaveTheSameStructureThan.name, language, replaceList);

	try {
		const resultado = JSON.parse(value);
		const model: T = resultado;

		return model;
	} catch (e) {
		return new InvalidValue(errorMessage);
	}
}