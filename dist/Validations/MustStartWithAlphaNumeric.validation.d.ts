import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
interface MustStartWithAlphaNumericInterface extends GenericValidation {
    (value: string, label: string, language?: string): InvalidValue | null;
}
export declare const MustStartWithAlphaNumeric: MustStartWithAlphaNumericInterface;
export {};
