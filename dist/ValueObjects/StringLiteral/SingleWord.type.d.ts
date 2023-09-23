import GenericType from "../../Types/RootTypes/GenericType.type";
export declare class SingleWord extends GenericType {
    constructor(value: string, label?: string | null);
}
export declare function createSingleWord(value: string, label?: string | null): SingleWord;
