import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface IsPositiveIntegerInterface extends GenericValidation {
    (value: number | string, label: string, required?: boolean, language?: string): InvalidValue | null;
}
export declare const IsPositiveInteger: IsPositiveIntegerInterface;
export {};
