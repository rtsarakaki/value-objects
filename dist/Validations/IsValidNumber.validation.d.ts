import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface IsValidNumberInterface extends GenericValidation {
    (value: number | string, label: string, required?: boolean, language?: string): InvalidValue | null;
}
export declare const IsValidNumber: IsValidNumberInterface;
export declare function convertStringToNumber(value: string | number | null | undefined): number | InvalidValue;
export {};
