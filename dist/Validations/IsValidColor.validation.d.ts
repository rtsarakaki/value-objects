import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface IsValidColorInterface extends GenericValidation {
    (value: string, label: string, language?: string): InvalidValue | null;
}
export declare const IsValidColor: IsValidColorInterface;
export {};
