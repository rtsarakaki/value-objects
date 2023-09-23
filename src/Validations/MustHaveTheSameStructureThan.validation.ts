import { InvalidValue } from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";

export function MustHaveTheSameStructureThan<T>(valor: string, label: string, language: string = 'en-US') {

	const replaceList = [
		{ tag: '${label}', value: label },
		{ tag: "${JSON.stringify('model')}", value: JSON.stringify('model') },
	]
	const errorMessage = getResourceMessageByKey(MustHaveTheSameStructureThan.name, language, replaceList)

	try {
		const resultado = JSON.parse(valor);
		const model: T = resultado;

		return model;
	} catch (e) {
		return new InvalidValue(errorMessage,);
	}
}