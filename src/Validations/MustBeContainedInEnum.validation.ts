import { InvalidValue } from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface MustBeContainedInEnumInterface extends GenericValidation {
	(value: string, label: string, enumeration: any, language?: string): InvalidValue | null;
}

export const MustBeContainedInEnum: MustBeContainedInEnumInterface = (
	value: string,
	label: string,
	enumeration: any,
	language: string = 'en-US'
) => {

	function validateEnum(value: string, errorMessage: string) {

		const enumErrorMessage = getResourceMessageByKey('enumError', language)
		if (typeof enumeration !== "object") return new InvalidValue(enumErrorMessage);
		if (enumeration === null) return new InvalidValue(enumErrorMessage);

		if (typeof value !== 'string') return new InvalidValue(errorMessage);

		const resultado = Object.keys(enumeration).some(v => {
			return value?.toLowerCase() === v?.toLowerCase();
		});

		if (!resultado) {
			return new InvalidValue(errorMessage,
			);
		}

		return null;
	}

	const replaceList = [
		{ tag: '${label}', value: label },
		{ tag: "${JSON.stringify('model')}", value: JSON.stringify('model') },
	]
	return validationAcceleratorSuggestion(validateEnum, value, label, "MustBeContainedInEnum", language, replaceList)
};