import InvalidValue from "../Errors/InvalidValue.error";
import { validateLabel } from "./ValidationsTools";

export const CannotHaveSpecialCharacters = (value: string, label: string, language: string = 'en-US') => {
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation


	const errorMessage = language === 'pt-BR' ? `${label}  não pode ter caracteres especiais.` : `${label}  cannot have special characters.`

	if (typeof value !== 'string') return new InvalidValue(errorMessage);

	let regex = /^[a-zA-Z0-9\s\p{L}]+$/u;
	return regex.test(value) ? null: new InvalidValue(errorMessage) ;
};