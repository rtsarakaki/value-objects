import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface MustBeContainedInEnumInterface extends GenericValidation {
    (value: string, label: string, enumeration: any, required?: boolean, language?: string): InvalidValue | null;
}
export declare const MustBeContainedInEnum: MustBeContainedInEnumInterface;
export {};
