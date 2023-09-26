import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
interface MustEndWithAlphaNumericInterface extends GenericValidation {
    (value: string, label: string, language?: string): InvalidValue | null;
}
export declare const MustEndWithAlphaNumeric: MustEndWithAlphaNumericInterface;
export {};
