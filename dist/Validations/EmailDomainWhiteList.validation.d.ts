import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
interface EmailDomainWhiteListInterface extends GenericValidation {
    (value: string, label: string, domains: string[], required?: boolean, language?: string): InvalidValue | null;
}
export declare const EmailDomainWhiteList: EmailDomainWhiteListInterface;
export {};
