import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
interface NumberCannotBeLessThanInterface extends GenericValidation {
    (value: string, label: string, minNumber: number, required?: boolean, language?: string): InvalidValue | null;
}
export declare const NumberCannotBeLessThan: NumberCannotBeLessThanInterface;
export {};
