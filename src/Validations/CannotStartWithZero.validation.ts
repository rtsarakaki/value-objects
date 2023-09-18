import InvalidValue from "../Errors/InvalidValue.error";
import { validateLabel } from "./ValidationsTools";

export const CannotStartWithZero = (value: string, label: string, language: string = 'en-US') => {
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const errorMessage = language === 'pt-BR' ? `${label} não pode começar com zero.` : `${label} cannot start with zero.`
	if (typeof value !== 'string') return new InvalidValue(errorMessage);
	return value.trim()[0] === '0' ? new InvalidValue(errorMessage) : null;
};
