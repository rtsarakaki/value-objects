import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
interface CannotContainNumbersInterface extends GenericValidation {
    (value: string, label: string, language?: string): InvalidValue | null;
}
export declare const CannotContainNumbers: CannotContainNumbersInterface;
export {};
