import { InvalidValue } from "../Errors/InvalidValue.error";
import { getResourceMessageByKey } from "./Messages.resource";

export interface ITagListItem {
	tag: string,
	value: string
}

export function replaceTagsInMessage(message: string, tagList: ITagListItem[]): string {
	try {
		const messageReplaced = tagList.reduce((result: string, tag: ITagListItem) => { return result.replace(tag.tag, tag.value) }, message)
		return messageReplaced;
	}
	catch (e){
		const errorMessage = getResourceMessageByKey('replaceTagsInMessage')
		throw new InvalidValue(errorMessage);
	}
}