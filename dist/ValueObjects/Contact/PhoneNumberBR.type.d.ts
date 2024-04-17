import { GenericType, GenericValidation } from "../../Types";
import { DDD } from "./DDD.type";
export declare class PhoneNumberBR extends GenericType {
    DDD: DDD;
    constructor(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createPhoneNumberBR(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]): PhoneNumberBR;
export declare function formatPhoneNumberBR(phoneNumber: string): string;
