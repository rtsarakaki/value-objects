import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface IsValidDateInterface extends GenericValidation {
    (value: string, label: string, language?: string): InvalidValue | null;
}
export declare const IsValidDate: IsValidDateInterface;
export {};
