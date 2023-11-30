import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface MustHaveAtLeastXLettersInterface extends GenericValidation {
    (value: string, label: string, lettersNumber: number, required?: boolean, language?: string): InvalidValue | null;
}
export declare const MustHaveAtLeastXLetters: MustHaveAtLeastXLettersInterface;
export {};
