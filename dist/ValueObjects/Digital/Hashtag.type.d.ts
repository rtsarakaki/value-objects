import { GenericType, GenericValidation } from "../../Types";
export declare class Hashtag extends GenericType {
    constructor(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createHashtag(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]): Hashtag;
