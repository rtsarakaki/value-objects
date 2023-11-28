import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface IsValidSlackChannelInterface extends GenericValidation {
	(value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}

export const IsValidHashtag: IsValidSlackChannelInterface = (value: string, label: string, required: boolean = true, language: string = 'en-US') => {

	function validateSlackChannel(channel: string, errorMessage: string) {
		try {
			if (typeof channel !== 'string') return new InvalidValue(errorMessage);
			if (!/^#[a-z0-9_.-]+$/i.test(channel)) return new InvalidValue(errorMessage);
			if (channel.endsWith('-') || channel.endsWith('_')) return new InvalidValue(errorMessage);

			return null

		} catch (err) {
			return new InvalidValue(errorMessage);
		}
	}

	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validateSlackChannel, value, label, required, "IsValidSlackChannel", language, replaceList)
};