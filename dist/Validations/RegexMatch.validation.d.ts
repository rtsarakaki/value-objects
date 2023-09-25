import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
interface RegexMatchInterface extends GenericValidation {
    (value: string, textRegex: string, regexExplanation: string, label: string, language?: string): InvalidValue | null;
}
export declare const RegexMatch: RegexMatchInterface;
export {};
