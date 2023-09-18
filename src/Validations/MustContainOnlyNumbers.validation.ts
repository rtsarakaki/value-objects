import InvalidValue from "../Errors/InvalidValue.error";
import { validateLabel } from "./ValidationsTools";

export const MustContainOnlyNumbers = (value: string, label: string, language: string = 'en-US') => {

	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const errorMessage = language === 'pt-BR' ? `${label}  deve conter apenas números.` : `${label} must contain only numbers.`
	if (typeof value !== 'string') return new InvalidValue(errorMessage);
	return isNaN(Number(value))
		? new InvalidValue(errorMessage)
		: null;
};