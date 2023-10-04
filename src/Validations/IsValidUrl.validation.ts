import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
import { validationAcceleratorSuggestion } from "./ValidationsTools";

interface IsValidUrlInterface extends GenericValidation {
	(value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}

export const IsValidUrl: IsValidUrlInterface = (value: string, label: string, required: boolean = true, language: string = 'en-US') => {

	function validateUrl(url: string): InvalidValue | null {

		const protocolRegex = /^((http|https|ftp|sftp|file|data|mailto):\/\/).*/
		const protocolMatch = url.match(protocolRegex)

		if (protocolMatch) {
			// protocols with especific validation
			const protocol = protocolMatch[1]
			const validateProtocolResult =  validateProtocol(protocol, url)
			return validateProtocolResult
		}
		try {
			// generic validation
			new URL(url)
			return null
		} catch (error) {
			return new InvalidValue('Invalid URL.')
		}
	}
	const replaceList = [{ tag: '${label}', value: label }]
	return validationAcceleratorSuggestion(validateUrl, value, label, required, "IsValidUrl", language, replaceList)
};

export function isFilePathFormat(url: string) {
	const regex = /^([a-zA-Z]:)?[\\/]?([^\\/:\*\?"<>\|]+[\\/])*([^\\/:\*\?"<>\|]+)?$/;
	return regex.test(url);
}

export function isDataFormat(url: string) {
	const regex = /^data:/;
	return regex.test(url);
}

export function isMailToFormat(url: string) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(url);
}

export function validateProtocol(protocol: string, url: string): InvalidValue | null {

	type ProtocolValidation = {
		protocol: string;
		regex: RegExp;
		errorMessage: string;
	};

	const protocolValidations: ProtocolValidation[] = [
		{
			protocol: 'http://',
			regex: /^(https?|http):\/\/([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})?(:\d+)?([\/?#][^"\s<>]*[^\s"<>\/\/])?\/?$/,
			errorMessage: 'Incorrect URL http protocol format.',
		},
		{
			protocol: 'https://',
			regex: /^(https?|http):\/\/([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})?(:\d+)?([\/?#][^"\s<>]*[^\s"<>\/\/])?\/?$/,
			errorMessage: 'Incorrect URL https protocol format.',
		},
		{
			protocol: 'ftp://',
			regex: /^ftp:\/\/([a-zA-Z0-9-]+(:[^:@\s]+)?@)?(ftp\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})?(:\d+)?|([a-zA-Z0-9-]+(\.[a-zA-Z]{2,})?(:\d+)?))(\/[^\s]*)?$/,
			errorMessage: 'Incorrect URL ftp protocol format.',
		},
		{
			protocol: 'sftp://',
			regex: /^sftp:\/\/([a-zA-Z0-9-]+(:[^:@\s]+)?@)?(sftp\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})?(:\d+)?|([a-zA-Z0-9-]+(\.[a-zA-Z]{2,})?(:\d+)?))(\/[^\s]*)?$/,
			errorMessage: 'Incorrect URL sftp protocol format.',
		},
		{
			protocol: 'mailto:',
			regex: /^mailto:([^\s@]+@[^\s@]+\.[^\s@]+)(\?[^?]+)?$/,
			errorMessage: 'Incorrect URL mailto protocol format.',
		},
		{
			protocol: 'file:///',
			regex: /^file:\/\/([a-zA-Z]:)?[\\/]?([^\\/:\*\?"<>\|]+[\\/])*([^\\/:\*\?"<>\|]+)?$/,
			errorMessage: 'Incorrect URL file protocol format.',
		},
		{
			protocol: 'data:',
			regex: /^data:[^,;]+(,[^,;]+)*$/,
			errorMessage: 'Incorrect URL data protocol format.',
		},
	];

	const validation = protocolValidations.find((pv) => pv.protocol === protocol);
	if (validation === undefined) return null

	const validationResult =  validation.regex.test(url) 
	return validationResult ? null : new InvalidValue(validation.errorMessage)

}