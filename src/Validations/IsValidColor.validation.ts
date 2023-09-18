import InvalidValue from "../Errors/InvalidValue.error";
import validateColor from "validate-color";
import { validateLabel } from "./ValidationsTools";

export const IsValidColor = (value: string, label: string, language: string = 'en-US') => {
	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const errorMessage = language === 'pt-BR' ? `${label}  deve ser uma cor valida.` : `${label}  must be a valid color.`

	function colorValidation(color: string) {
		try {
			if (typeof color !== 'string') throw new InvalidValue(errorMessage);
			return validateColor(color.trim());
		} catch (err) {
			return false;
		}
	}

	return !colorValidation(value) ? new InvalidValue(errorMessage) : null;
};