import { GenericType } from "../../Types";
export declare class CollectionThatDoesNotAllowDuplicates<T extends object> extends GenericType {
    items: T[];
    keys: string[];
    _label: string;
    _language: string;
    propertyUsedAsKeyToValidadeDuplicates: keyof T;
    constructor(itemsToBeLoaded: T[], propertyUsedAsKeyToValidadeDuplicates: keyof T, label: string, language?: string);
    add(item: T): void;
    remove(item: T): void;
    update(key: string, newItem: T): void;
    checkForDuplicates(): void;
}
