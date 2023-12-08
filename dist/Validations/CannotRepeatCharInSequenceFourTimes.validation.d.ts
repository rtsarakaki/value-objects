import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface CannotRepeatCharInSequenceFourTimesInterface extends GenericValidation {
    (value: any, label: string, required?: boolean, language?: string): InvalidValue | null;
}
export declare const CannotRepeatCharInSequenceFourTimes: CannotRepeatCharInSequenceFourTimesInterface;
export {};
