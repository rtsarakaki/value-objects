import { GenericType, GenericValidation } from "../../Types";
export declare class FullName extends GenericType {
    constructor(name: string, label: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
    private get _nameParts();
    get firstName(): string;
    get lastName(): string;
    get middleName(): string;
}
export declare function createFullName(name: string, label: string, required?: boolean): FullName;
export declare const formatFullName: (fullName: string) => string;
