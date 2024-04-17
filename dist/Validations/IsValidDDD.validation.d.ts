import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface IsValidDDDInterface extends GenericValidation {
    (value: string, label: string, dddList: any[], required?: boolean, language?: string): InvalidValue | null;
}
export declare const IsValidDDD: IsValidDDDInterface;
export declare function normalizeDDD(DDD: string): string | null;
export {};
