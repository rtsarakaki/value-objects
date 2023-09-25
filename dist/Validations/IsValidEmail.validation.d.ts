import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface IsValidEmailInterface extends GenericValidation {
    (value: string, label: string, language?: string): InvalidValue | null;
}
export declare const IsValidEmail: IsValidEmailInterface;
export {};
