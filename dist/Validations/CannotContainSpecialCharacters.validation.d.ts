import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
interface CannotContainSpecialCharactersInterface extends GenericValidation {
    (value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}
export declare const CannotContainSpecialCharacters: CannotContainSpecialCharactersInterface;
export {};
