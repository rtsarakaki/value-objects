import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface MustHaveAtLeastXCharactersInterface extends GenericValidation {
    (value: string, label: string, charactersNumber: number, required?: boolean, language?: string): InvalidValue | null;
}
export declare const MustHaveAtLeastXCharacters: MustHaveAtLeastXCharactersInterface;
export {};
