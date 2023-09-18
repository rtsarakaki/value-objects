import InvalidValue from "../Errors/InvalidValue.error";
import { validateLabel } from "./ValidationsTools";

export const CannotHaveMoreThanXCharacters = (
	value: string,
	label: string,
	charactersNumber: number,
	language: string = 'en-US'
) => {
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const errorMessage = language === 'pt-BR' ? `${label}  não pode ter mais que ${charactersNumber} caracteres.` : `${label} cannot have more than  ${charactersNumber}  characters.`;

	try {
		if (typeof value !== 'string') throw new InvalidValue(errorMessage);
		return value?.trim().length > charactersNumber ? new InvalidValue(errorMessage) : null;
	}
	catch (e) {
		return new InvalidValue(errorMessage)
	}
};