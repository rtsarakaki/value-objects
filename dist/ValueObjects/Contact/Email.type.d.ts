import { GenericType, GenericValidation } from "../../Types";
export declare class Email extends GenericType {
    constructor(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createEmail(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]): Email;
