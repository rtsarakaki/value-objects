import resources from './Messages.resources.json';
import { ITagListItem, replaceTagsInMessage } from './Replacer.resource';

export function getResourceMessageByKey(key: string, language?: string, replaces?: ITagListItem[]) {
	const defaultLanguage = getLanguage(language);
	const validation = getValidationByKey(key);
	const message = getMessageByLanguage(validation, defaultLanguage);
	
	if (message === null) {
		throw new Error(`Message not found for key: ${key} and language: ${defaultLanguage}`);
	}

	const messageReplaced = replaces ? replaceTagsInMessage(message, replaces) : message
	return messageReplaced;
}

export function getLanguage(language?: string): any {
	const result = (language === undefined) ? resources.defaultLanguage : language

	if (typeof result === 'string') {
		return result
	}

	return 'en-US'
}

function getValidationByKey(key: string): any {
	const validations = resources.validations.filter((validation) => {
		return validation.key === key
	})

	return validations[0]
}

function getMessageByLanguage(validation: any, language: string) {
	
	if (validation === undefined) {return null}

	const message = validation.messages.filter((message: any) => {
		return message.language === language
	})

	if (message.length === 0) {return null}

	return message[0].message
}