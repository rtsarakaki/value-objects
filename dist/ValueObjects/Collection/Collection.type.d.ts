import { GenericType } from "../../Types";
export declare class Collection<T extends object> extends GenericType {
    items: T[];
    _label: string;
    _language: string;
    validationCallback: (item: T, items: T[]) => boolean;
    constructor(itemsToBeLoaded: T[], label: string, validationCallback: (item: T, items: T[]) => boolean, language?: string);
    add(item: T): void;
    remove(index: number): void;
    update(index: number, newItem: T): void;
    findByIndex(index: number): T;
    checkForDuplicates(): void;
}
