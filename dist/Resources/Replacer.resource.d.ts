export interface ITagListItem {
    tag: string;
    value: string;
}
export declare function replaceTagsInMessage(message: string, tagList: ITagListItem[]): string;
