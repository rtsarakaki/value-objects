import { GenericType, GenericValidation } from "../../Types";
export declare class PhoneNumberBR extends GenericType {
    constructor(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createPhoneNumberBR(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]): PhoneNumberBR;
export declare function formatPhoneNumberBR(phoneNumber: string): string;
