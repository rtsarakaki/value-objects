import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
interface CannotHaveMoreThanXCharactersInterface extends GenericValidation {
    (value: string, label: string, charactersNumber: number, language?: string): InvalidValue | null;
}
export declare const CannotHaveMoreThanXCharacters: CannotHaveMoreThanXCharactersInterface;
export {};
