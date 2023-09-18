import InvalidValue from "../Errors/InvalidValue.error";

export function validateLabel(value: string, language: string = 'en-US') {
	const errorMessage = language === 'pt-BR' ? 'Label não pode ser vazio.' : 'Label cannot be empty.'
	if (typeof value !== 'string') return new InvalidValue(errorMessage);
	if (value.trim() === '') return new InvalidValue(errorMessage);
	return null;
}