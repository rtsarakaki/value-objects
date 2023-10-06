import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface IsValidPhoneNumberInterface extends GenericValidation {
    (value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}
export declare const IsValidPhoneNumberBR: IsValidPhoneNumberInterface;
export declare function normalizePhoneNumber(phoneNumber: string): string | null;
export {};
