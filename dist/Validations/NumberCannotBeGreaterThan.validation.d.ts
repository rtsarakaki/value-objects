import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
interface NumberCannotBeGreaterThanInterface extends GenericValidation {
    (value: string, label: string, maxNumber: number, required?: boolean, language?: string): InvalidValue | null;
}
export declare const NumberCannotBeGreaterThan: NumberCannotBeGreaterThanInterface;
export {};
