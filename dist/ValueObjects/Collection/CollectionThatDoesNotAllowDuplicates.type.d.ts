import { GenericType } from "../../Types";
export declare class CollectionThatDoesNotAllowDuplicates<T> extends GenericType {
    items: T[];
    keys: string[];
    _label: string;
    _language: string;
    constructor(label: string, language?: string);
    add(item: T, key: string): void;
}
