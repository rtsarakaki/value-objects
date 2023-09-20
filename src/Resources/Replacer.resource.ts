
export interface ITagListItem {
	tag: string,
	value: string
}

export function replaceTagsInMessage(message: string, tagList: ITagListItem[]): string {
	const messageReplaced = tagList.reduce((result : string, tag: ITagListItem) => { return result.replace(tag.tag, tag.value) }, message)
	return messageReplaced;
}