import { InvalidValue } from "../Errors";
import { GenericValidation } from "../Types";
interface EmailDomainBlackListInterface extends GenericValidation {
    (value: string, label: string, domains: string[], required?: boolean, language?: string): InvalidValue | null;
}
export declare const EmailDomainBlackList: EmailDomainBlackListInterface;
export {};
