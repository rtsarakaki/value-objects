import { GenericType, GenericValidation } from "../../Types";
export type DDDList = [string, number[]][];
export declare class DDD extends GenericType {
    constructor(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
    static getDDDList(): DDDList;
    getState(): string | null;
    getFormated(): string | null;
}
export declare function createDDD(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]): DDD;
export declare function formatDDD(DDD: string): string;
