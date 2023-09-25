import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
interface MustHaveOnlyOneWordInterface extends GenericValidation {
    (value: string, label: string, language?: string): InvalidValue | null;
}
export declare const MustHaveOnlyOneWord: MustHaveOnlyOneWordInterface;
export {};
