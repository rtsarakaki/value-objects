import InvalidValue from "../Errors/InvalidValue.error";

export function MustHaveTheSameStructureThan<T>(valor: string, label: string, language: string = 'en-US') {

	const errorMessage = language === 'pt-BR' ? `${label}  deve ter a mesma estrutura que ${JSON.stringify('model')}.` : `${label}  must have the same structure than ${JSON.stringify('model')}.`

	try {
		const resultado = JSON.parse(valor);
		const model: T = resultado;

		return model;
	} catch (e) {
		return new InvalidValue(errorMessage,);
	}
}