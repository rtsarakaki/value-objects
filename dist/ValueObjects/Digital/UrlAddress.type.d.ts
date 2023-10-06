import { GenericType, GenericValidation } from "../../Types";
export declare class UrlAddress extends GenericType {
    private _urlObject;
    constructor(url: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
    get hostname(): string;
    get host(): string;
    get pathname(): string;
    get port(): string;
    get protocol(): string;
    get username(): string;
    get password(): string;
    get search(): string;
    get params(): URLSearchParams | undefined;
}
export declare function createUrlAddress(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]): UrlAddress;
export declare function addDefaultProtocol(url: string): string;
