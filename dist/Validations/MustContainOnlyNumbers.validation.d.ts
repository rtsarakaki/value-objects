import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface MustContainOnlyNumbersInterface extends GenericValidation {
    (value: string, label: string, language?: string): InvalidValue | null;
}
export declare const MustContainOnlyNumbers: MustContainOnlyNumbersInterface;
export {};
