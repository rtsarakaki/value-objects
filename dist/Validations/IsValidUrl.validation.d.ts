import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface IsValidUrlInterface extends GenericValidation {
    (value: string, label: string, language?: string): InvalidValue | null;
}
export declare const IsValidUrl: IsValidUrlInterface;
export {};
