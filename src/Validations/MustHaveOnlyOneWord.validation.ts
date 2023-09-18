import InvalidValue from "../Errors/InvalidValue.error";
import { validateLabel } from "./ValidationsTools";

export const MustHaveOnlyOneWord = (value: string, label: string, language: string = 'en-US') => {

	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const errorMessage = language === 'pt-BR' ? `${label}  não pode conter espaços.` : `${label}  cannot contain spaces.`

	try {
		const haveSpace = value?.trim().indexOf(' ') != -1
		const haveTab = value?.trim().indexOf('	') != -1
		const haveReturn = value?.trim().indexOf(`
		`) != -1
		return (haveSpace || haveReturn || haveTab) ? new InvalidValue(errorMessage) : null;
	}
	catch (e) {
		return new InvalidValue(errorMessage)
	}
};