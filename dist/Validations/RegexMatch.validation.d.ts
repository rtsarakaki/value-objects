import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
interface RegexMatchInterface extends GenericValidation {
    (value: string, label: string, textRegex: string, regexExplanation: string, required?: boolean, language?: string): InvalidValue | null;
}
export declare const RegexMatch: RegexMatchInterface;
export {};
