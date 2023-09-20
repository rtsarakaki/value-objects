import InvalidValue from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
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

	const replaceList = [
		{ tag: '${label}', value: label },
		{ tag: "${JSON.stringify('model')}", value: JSON.stringify('model') },
	]
	const errorMessage = getResourceMessageByKey(MustBeContainedInEnum.name, language, replaceList)

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