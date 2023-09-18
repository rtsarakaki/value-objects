import InvalidValue from "../Errors/InvalidValue.error";
import { validateLabel } from "./ValidationsTools";



export const MustBeContainedInEnum = (
	value: string,
	label: string,
	enumeration: any,
	language: string = 'en-US'
) => {

	const labelValidation = validateLabel(label) 
	if (labelValidation !== null) return labelValidation

	const enumErrorMessage = language === 'pt-BR' ? 'Enum não é valida.' : 'Enum is not valid.'
	if (typeof enumeration !== "object") return new InvalidValue(enumErrorMessage);
	if (enumeration === null) return new InvalidValue(enumErrorMessage);

	const lista = Object.values(enumeration).join();

	const errorMessage = language === 'pt-BR' ? `${label}  (${value}) deve ter estar entre os seguintes valores ${lista}` : `${label}  must be among the following values ${JSON.stringify('model')}.`
	if (typeof value !== 'string') return new InvalidValue(errorMessage);

	const resultado = Object.keys(enumeration).some(v => {
		return value?.toLowerCase() === v?.toLowerCase();
	});

	if (!resultado) {
		return new InvalidValue(errorMessage,
		);
	}

	return null;
};