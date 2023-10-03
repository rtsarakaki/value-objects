import { InvalidValue } from "../Errors/InvalidValue.error";
import { GenericValidation } from "../Types";
interface IsValidUrlInterface extends GenericValidation {
    (value: string, label: string, language?: string): InvalidValue | null;
}
export declare const IsValidUrl: IsValidUrlInterface;
export declare function isFilePathFormat(url: string): boolean;
export declare function isDataFormat(url: string): boolean;
export declare function isMailToFormat(url: string): boolean;
export declare function validateProtocol(protocol: string, url: string): InvalidValue | null;
export {};
