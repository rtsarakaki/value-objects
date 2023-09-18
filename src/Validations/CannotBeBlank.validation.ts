import InvalidValue from "../Errors/InvalidValue.error";
import { validateLabel } from "./ValidationsTools";

export const CannotBeBlank = (
	value: string,
	label: string,
	required = true,
	language: string = 'en-US'
) => {
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const errorMessage = language === 'pt-BR' ? `${label} não pode estar em branco.` : `${label} cannot be blank.`;

	try {
		if (typeof value !== 'string') throw new InvalidValue(errorMessage);
		return required && (value == undefined || value.length === 0 || value?.trim() === '') ? new InvalidValue(errorMessage) : null;
	}
	catch (e) {
		return new InvalidValue(errorMessage)
	}
};