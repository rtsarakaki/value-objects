import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface IsValidSlackChannelInterface extends GenericValidation {
    (value: string, label: string, required?: boolean, language?: string): InvalidValue | null;
}
export declare const IsValidSlackChannel: IsValidSlackChannelInterface;
export {};
