import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
interface CannotStartWithZeroInterface extends GenericValidation {
    (value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}
export declare const CannotStartWithZero: CannotStartWithZeroInterface;
export {};
