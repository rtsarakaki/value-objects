import { InvalidValue } from "../Errors";
import { getResourceMessageByKey } from "../Resources/Messages.resource";
import { GenericValidation } from "../Types";
import { validateLabel } from "./ValidationsTools";

export const MustHaveOnlyOneWord: GenericValidation = (value: string, label: string, language: string = 'en-US') => {

	const labelValidation = validateLabel(label)
	if (labelValidation !== null) return labelValidation

	const replaceList = [
		{ tag: '${label}', value: label },
	]
	const errorMessage = getResourceMessageByKey("MustHaveOnlyOneWord", language, replaceList)

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