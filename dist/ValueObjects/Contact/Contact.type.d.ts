import { GenericType, GenericValidation } from "../../Types";
import { ShortDescription } from "../StringLiteral/ShortDescription.type";
export type ContactType = 'SlackChannel' | 'Email' | 'Phone';
export declare class Contact extends GenericType {
    _type: ContactType;
    _description: ShortDescription;
    constructor(value: string, type: ContactType, description: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
    get description(): any;
    get type(): ContactType;
}
export declare function createContact(value: string, type: ContactType, description: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]): Contact;
